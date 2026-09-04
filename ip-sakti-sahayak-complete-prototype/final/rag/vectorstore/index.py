from ingestion.loader import load_records
from ingestion.cleaner import clean_text
from ingestion.metadata import normalize_metadata
from ingestion.chunker import chunk_record
from embeddings.embedder import Embedder

class RAGIndex:
    def __init__(self): self.embedder=Embedder(); self.records=[]; self.matrix=None
    def build(self):
        base=[]
        for r in load_records():
            r=normalize_metadata(r); r['text']=clean_text(r.get('text',''))
            base.extend(chunk_record(r))
        self.records=base
        texts=[r['title']+' '+r['text']+' '+' '.join(r.get('keywords',[])) for r in base]
        self.matrix=self.embedder.fit(texts)
        return len(self.records)
