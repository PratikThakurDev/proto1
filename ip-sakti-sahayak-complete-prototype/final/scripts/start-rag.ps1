Set-Location "$PSScriptRoot\..\rag"
if (!(Test-Path .venv)) { python -m venv .venv }
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn api.rag_api:app --reload --port 8000
