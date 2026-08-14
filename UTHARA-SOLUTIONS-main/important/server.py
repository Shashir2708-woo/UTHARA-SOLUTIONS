#!/usr/bin/env python3
"""
UTTHARA SOLUTIONS - Lightweight Production HTTP Server & Telemetry API Gateway
Developed by UTTHARA SOLUTIONS
Product: UTTHARA SOLUTIONS ("The Autonomous AI Operating System for Smart Manufacturing")
"""

import http.server
import socketserver
import json
import urllib.parse
import urllib.request
import urllib.error
import sys
import os

PORT = 8080

# ── Load .env ──────────────────────────────────────────────────────────────
def load_env(filepath='.env'):
    """Read a simple KEY=VALUE .env file into os.environ."""
    if not os.path.isfile(filepath):
        return
    with open(filepath, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, _, value = line.partition('=')
            os.environ.setdefault(key.strip(), value.strip())

load_env(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')

# Models to try in order (first available wins)
GEMINI_CANDIDATE_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
]


# ── Gemini Helper ──────────────────────────────────────────────────────────
def call_gemini(prompt_text, persona, context_json):
    """Call the Google Gemini API, trying multiple models. Returns response text."""
    if not GEMINI_API_KEY:
        return None, 'GEMINI_API_KEY is not set. Add it to the .env file.'

    system_prompt = (
        f"You are UTTHARA SOLUTIONS Copilot ({persona}), an expert autonomous AI "
        f"system for smart manufacturing.\n"
        f"Context: {json.dumps(context_json, default=str)}\n\n"
        "Provide a clear, professional, direct industrial answer with bold headings, "
        "bullet points, and actionable engineering recommendations."
    )

    payload = json.dumps({
        "contents": [
            {"role": "user", "parts": [{"text": f"{system_prompt}\n\nUser Question: {prompt_text}"}]}
        ],
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 1000}
    }).encode('utf-8')

    last_err = ''
    for model in GEMINI_CANDIDATE_MODELS:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{model}:generateContent?key={GEMINI_API_KEY}"
        )
        req = urllib.request.Request(
            url, data=payload,
            headers={'Content-Type': 'application/json'}
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                parts = (data.get('candidates', [{}])[0]
                             .get('content', {})
                             .get('parts', []))
                if parts:
                    return ''.join(p.get('text', '') for p in parts), None
                last_err = f'{model}: empty response'
        except urllib.error.HTTPError as e:
            body = e.read().decode('utf-8', errors='replace')
            last_err = f'{model} HTTP {e.code}: {body}'
            # 403 = key revoked / leaked → no point trying other models
            if e.code == 403:
                return None, f'API key rejected (403): {body}'
        except Exception as e:
            last_err = f'{model}: {e}'

    return None, last_err


# ── HTTP Handler ───────────────────────────────────────────────────────────
class UttharaSolutionsHandler(http.server.SimpleHTTPRequestHandler):

    # ── CORS pre-flight ────────────────────────────────────────────────
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    # ── GET ─────────────────────────────────────────────────────────────
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith('/api/v1/'):
            self.handle_api_get(parsed.path)
        else:
            super().do_GET()

    # ── POST ────────────────────────────────────────────────────────────
    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith('/api/v1/'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
            try:
                data = json.loads(body) if body else {}
            except json.JSONDecodeError:
                data = {}
            self.handle_api_post(parsed.path, data)
        else:
            self.send_error(405, "Method Not Allowed")

    # ── Helpers ─────────────────────────────────────────────────────────
    def _json_response(self, obj, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(obj).encode('utf-8'))

    def handle_api_get(self, path):
        if path == '/api/v1/health':
            res = {
                "status": "HEALTHY",
                "version": "1.0.0",
                "vendor": "UTTHARA SOLUTIONS",
                "geminiKeySet": bool(GEMINI_API_KEY)
            }
        elif path == '/api/v1/telemetry/stream':
            res = {
                "timestamp": "2026-08-11T10:45:00Z",
                "nodeId": "dev_esp32_01",
                "machineId": "mac_cnc_01",
                "telemetry": {
                    "vibration_mpu6050": 4.8,
                    "temperature_dht22": 68.4,
                    "current_acs712": 24.1,
                    "power_pzem004t": 18.5
                }
            }
        else:
            res = {"message": "UTTHARA SOLUTIONS API Endpoint Active", "path": path}

        self._json_response(res)

    def handle_api_post(self, path, data):
        if path == '/api/v1/ai/query':
            prompt = data.get('query', '')
            persona = data.get('persona', 'AI Manufacturing Assistant')
            context = data.get('context', {})

            text, err = call_gemini(prompt, persona, context)

            if text:
                res = {
                    "persona": persona,
                    "response": text,
                    "source": "gemini",
                    "tenantScoped": True
                }
            else:
                # Return the error so the client can display it / fall back
                res = {
                    "persona": persona,
                    "response": f"UTTHARA SOLUTIONS Orchestrator response for query: {prompt}",
                    "source": "fallback",
                    "tenantScoped": True,
                    "error": err
                }
        else:
            res = {"status": "SUCCESS", "received": data}

        self._json_response(res)


# ── Server Bootstrap ───────────────────────────────────────────────────────
def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True

    key_status = "[OK] loaded" if GEMINI_API_KEY else "[MISSING] add GEMINI_API_KEY to .env"
    with socketserver.TCPServer(("", PORT), UttharaSolutionsHandler) as httpd:
        print("=" * 55)
        print("  UTTHARA SOLUTIONS Server Started")
        print("  Autonomous AI Operating System for Smart Manufacturing")
        print(f"  Listening on : http://localhost:{PORT}")
        print(f"  Gemini API   : {key_status}")
        print("=" * 55)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server cleanly.")

if __name__ == '__main__':
    run_server()

