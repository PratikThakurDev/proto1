from .config import settings
from .embeddings import embed_query
from .store import search


def retrieve(query: str, top_k: int | None = None):
    k = top_k or settings.top_k
    return search(embed_query(query), k)


def build_context(rows):
    chunks = []
    total = 0
    for i, row in enumerate(rows, 1):
        m = row["metadata"]
        block = (
            f"SOURCE {i}\n"
            f"Record ID: {m.get('record_id','')}\n"
            f"Title: {m.get('title','')}\n"
            f"Classification: {m.get('classification','')}\n"
            f"Jurisdiction: {m.get('jurisdiction','')}\n"
            f"Source: {m.get('source','')}\n"
            f"URL: {m.get('source_url','')}\n"
            f"Evidence: {row['text']}\n"
        )
        if total + len(block) > settings.max_context_chars:
            break
        chunks.append(block)
        total += len(block)
    return "\n---\n".join(chunks)
