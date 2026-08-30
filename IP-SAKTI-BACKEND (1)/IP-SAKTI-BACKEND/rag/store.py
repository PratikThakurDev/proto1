from pathlib import Path
from typing import Any
import chromadb
from .config import settings

_client = None
_collection = None


def get_collection():
    global _client, _collection
    if _collection is None:
        Path(settings.chroma_path).mkdir(parents=True, exist_ok=True)
        _client = chromadb.PersistentClient(path=settings.chroma_path)
        _collection = _client.get_or_create_collection(
            name=settings.collection_name,
            metadata={"hnsw:space": "cosine"},
        )
    return _collection


def reset_collection():
    global _collection
    client = chromadb.PersistentClient(path=settings.chroma_path)
    try:
        client.delete_collection(settings.collection_name)
    except Exception:
        pass
    _collection = None
    return get_collection()


def upsert_records(ids: list[str], documents: list[str], metadatas: list[dict[str, Any]], embeddings: list[list[float]]):
    collection = get_collection()
    collection.upsert(
        ids=ids,
        documents=documents,
        metadatas=metadatas,
        embeddings=embeddings,
    )


def search(query_embedding: list[float], top_k: int = 5):
    collection = get_collection()
    if collection.count() == 0:
        return []
    result = collection.query(
        query_embeddings=[query_embedding],
        n_results=min(top_k, collection.count()),
        include=["documents", "metadatas", "distances"],
    )
    rows = []
    docs = result.get("documents", [[]])[0]
    metas = result.get("metadatas", [[]])[0]
    distances = result.get("distances", [[]])[0]
    for doc, meta, distance in zip(docs, metas, distances):
        rows.append({"text": doc, "metadata": meta or {}, "distance": float(distance)})
    return rows


def stats():
    collection = get_collection()
    return {"collection": settings.collection_name, "count": collection.count()}
