# IP-SAKTI-BACKEND

Complete prototype backend combining the Node/Express application API, JWT authentication, MongoDB Atlas integration, Python/FastAPI RAG service, ChromaDB retrieval, embeddings, optional LLM generation, and the 500-record prototype dataset.

## Architecture

React (5173)
  -> Express + JWT (5000)
      -> MongoDB Atlas
      -> Python RAG API (8000)
          -> ChromaDB
          -> Sentence Transformers
          -> optional LLM

## Folder structure

IP-SAKTI-BACKEND/
  backend/                 Node/Express application backend
  rag/                     Python/FastAPI RAG service
  data/                    500-record prototype JSONL dataset
  package.json             Node dependencies
  rag/requirements.txt     Python dependencies
  .env.example             shared configuration template

## 1. Node setup

PowerShell:

npm install
Copy-Item .env.example .env

Edit .env and set MONGODB_URI. Generate your own JWT_SECRET for anything beyond local demo use.

## 2. Python setup

PowerShell:

python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r rag/requirements.txt

## 3. Test RAG with 10 records first

From the project root:

python -m rag.ingest --limit 10 --reset

Then start the RAG service in Terminal 1:

uvicorn rag.main:app --reload --port 8000

Open:

http://127.0.0.1:8000/docs

Check GET /health and POST /search.

## 4. Load all 500 prototype records

Only after the 10-record test succeeds:

python -m rag.ingest --limit 500 --reset

Verify GET /rag/stats reports count 500.

## 5. Start Express

In Terminal 2, from the project root:

npm run dev

Express runs at:

http://127.0.0.1:5000

## 6. Test the complete stack

1. GET http://127.0.0.1:5000/health
2. POST /api/auth/register
3. POST /api/auth/login
4. Copy the returned JWT.
5. Use Authorization: Bearer <JWT> for protected endpoints.
6. POST /api/products to create a product.
7. POST /api/ai/search to test retrieval through Express.
8. POST /api/ai/assess to test product classification.
9. POST /api/ai/passport to generate and save a passport.
10. POST /api/ai/chat to test RAG chat.

## Important security notes

- Never commit .env.
- Never put MONGODB_URI or JWT_SECRET in the React frontend.
- Rotate any database credential that has been exposed publicly.
- The 500-record dataset is a prototype dataset, not a substitute for a current authoritative legal corpus.
- Legal/regulatory outputs should show evidence and a disclaimer and should be verified against current official sources.
