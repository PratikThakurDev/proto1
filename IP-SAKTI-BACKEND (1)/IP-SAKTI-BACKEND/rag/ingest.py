import argparse
import json
from pathlib import Path
from tqdm import tqdm
from .config import settings
from .embeddings import embed_texts
from .store import reset_collection, upsert_records


def load_jsonl(path: str, limit: int | None = None):
    records = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            records.append(json.loads(line))
            if limit and len(records) >= limit:
                break
    return records


def normalize(record: dict, index: int):
    rid = str(record.get("id") or record.get("record_id") or f"prototype-{index+1}")
    title = str(record.get("title") or record.get("name") or "Untitled record")
    text = str(record.get("text") or record.get("content") or record.get("description") or "")
    category = str(record.get("classification") or record.get("category") or record.get("domain") or "Other")
    source = str(record.get("source") or "Prototype knowledge base")
    jurisdiction = str(record.get("jurisdiction") or "India")
    url = str(record.get("source_url") or record.get("url") or "")

    combined = (
        f"Title: {title}\n"
        f"Classification: {category}\n"
        f"Jurisdiction: {jurisdiction}\n"
        f"Source: {source}\n"
        f"Content: {text}"
    )
    metadata = {
        "record_id": rid,
        "title": title,
        "classification": category,
        "source": source,
        "jurisdiction": jurisdiction,
        "source_url": url,
    }
    return rid, combined, metadata


def ingest(limit: int | None = None, batch_size: int = 32, reset: bool = False):
    path = Path(settings.dataset_path)
    if not path.exists():
        raise FileNotFoundError(f"Dataset not found: {path}")

    records = load_jsonl(str(path), limit)
    if not records:
        raise ValueError("Dataset is empty")

    if reset:
        reset_collection()

    ids, docs, metas = [], [], []
    for i, record in enumerate(records):
        rid, doc, meta = normalize(record, i)
        ids.append(rid)
        docs.append(doc)
        metas.append(meta)

    for start in tqdm(range(0, len(docs), batch_size), desc="Ingesting"):
        batch_docs = docs[start:start+batch_size]
        vectors = embed_texts(batch_docs)
        upsert_records(
            ids[start:start+batch_size],
            batch_docs,
            metas[start:start+batch_size],
            vectors,
        )

    print(f"\nINGESTION COMPLETE: {len(records)} records")
    print(f"ChromaDB count: {__import__('rag.store', fromlist=['stats']).stats()['count']}")
    return len(records)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--batch", type=int, default=32)
    parser.add_argument("--reset", action="store_true")
    args = parser.parse_args()
    ingest(args.limit, args.batch, args.reset)
