from fastapi import FastAPI, HTTPException
from .config import settings
from .db import ping, save_passport
from .passport import build_passport
from .retrieval import retrieve, build_context
from .llm import generate_answer
from .schemas import AssessRequest, ChatRequest
from .store import stats

app = FastAPI(
    title="IP-SAKTI Sahayak Prototype RAG",
    version="3.0.0",
    description="RAG backend for Ayurveda IP, regulatory, TK and ABS navigation.",
)

@app.get("/")
def root():
    return {"service": "IP-SAKTI Sahayak RAG", "status": "running", "docs": "/docs"}

@app.get("/health")
def health():
    chroma = stats()
    mongo = None
    mongo_error = None
    try:
        mongo = ping()
    except Exception as exc:
        mongo_error = str(exc)
    return {
        "status": "ok",
        "rag": chroma,
        "mongodb": mongo,
        "mongodb_error": mongo_error,
    }

@app.get("/rag/stats")
def rag_stats():
    return stats()

@app.post("/search")
def search_endpoint(payload: ChatRequest):
    rows = retrieve(payload.question, payload.top_k)
    return {
        "query": payload.question,
        "count": len(rows),
        "results": [
            {"rank": i + 1, **row} for i, row in enumerate(rows)
        ],
    }

@app.post("/assess")
def assess(payload: AssessRequest):
    try:
        passport = build_passport(payload.model_dump())
        passport["jurisdiction"] = payload.jurisdiction
        passport["retrieval_purpose"] = "Product classification and evidence retrieval"
        return passport
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Assessment failed: {exc}")

@app.post("/passport")
def passport(payload: AssessRequest):
    try:
        result = build_passport(payload.model_dump())
        result["jurisdiction"] = payload.jurisdiction
        mongo_id = save_passport(result)
        if mongo_id:
            result["mongodb_id"] = mongo_id
        return result
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Passport generation failed: {exc}")

@app.post("/chat")
def chat(payload: ChatRequest):
    try:
        query = f"{payload.question}\nJurisdiction: {payload.jurisdiction}\nProduct: {payload.product}"
        rows = retrieve(query, payload.top_k)
        context = build_context(rows)
        generated = generate_answer(payload.question, context)
        return {
            **generated,
            "query": payload.question,
            "jurisdiction": payload.jurisdiction,
            "retrieved_count": len(rows),
            "sources": [
                {
                    "rank": i + 1,
                    "record_id": r["metadata"].get("record_id"),
                    "title": r["metadata"].get("title"),
                    "source": r["metadata"].get("source"),
                    "url": r["metadata"].get("source_url"),
                    "classification": r["metadata"].get("classification"),
                    "distance": r.get("distance"),
                }
                for i, r in enumerate(rows)
            ],
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Chat failed: {exc}")
