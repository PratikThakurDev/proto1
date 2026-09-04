# IP-SAKTI Sahayak — Full Prototype

This package combines the supplied React frontend, Node/Express backend, and a separate Python RAG service using **500 synthetic prototype records**.

## Architecture

Browser (Vite :5173) → Node/Express (:5000) → Python RAG/FastAPI (:8000) → TF-IDF vector retrieval → evidence → classification/analysis → Node report generator.

### 500 sample records
- TKDL: 100
- India Code/statutes & rules: 100
- IP India: 200 (100 patents, 50 trademarks, 25 designs, 25 GI)
- NBA/ABS: 100

The records are synthetic prototype data. They are deliberately marked `sample: true`; they are not official database exports and should not be presented as legal advice.

## Requirements
- Node.js 20+
- Python 3.11–3.13 recommended
- MongoDB local or MongoDB Atlas

## Windows setup

### 1. Start MongoDB
Make sure MongoDB is running on the URI in `backend/.env`.

### 2. Backend
```powershell
cd backend
npm install
npm run seed
npm run dev
```
Backend: http://localhost:5000

### 3. RAG
Open a second PowerShell:
```powershell
cd rag
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn api.rag_api:app --reload --port 8000
```
RAG: http://localhost:8000

### 4. Frontend
Open a third PowerShell:
```powershell
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

The frontend automatically attempts the seeded demo account:
`demo@ipsakti.local / Demo@123`

## Test RAG first
```powershell
curl http://localhost:8000/health
```
Expected: `records: 500` (or a larger chunk count after chunking; the source record count is 500).

Then test retrieval:
```powershell
curl -X POST http://localhost:8000/retrieve -H "Content-Type: application/json" -d "{\"query\":\"ashwagandha herbal formulation patent\",\"top_k\":5}"
```

## Test Product Analysis
1. Open `/analyze`.
2. Keep the default Herbal Digestive Formula or enter your own product.
3. Complete the six steps.
4. Click **Analyze My Product**.
5. The request goes frontend → backend → RAG.
6. The result contains classification, IP, regulatory, TK/ABS, markets and evidence.

## Test AI Assistant
Open `/assistant` and ask:
- How can I patent a herbal formulation in India?
- What should I check for traditional knowledge?
- What regulatory evidence should I review?

The answer is grounded in the 500-record prototype knowledge base.

## Health check
Open:
`http://localhost:5000/api/health`

It reports both backend and RAG health.

## Bhashini
Bhashini integration remains in `backend/src/services/bhashini/`. Add real credentials to `backend/.env` when you are ready. The RAG prototype itself does not depend on Bhashini.
