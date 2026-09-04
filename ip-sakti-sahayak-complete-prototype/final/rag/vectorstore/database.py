from pathlib import Path
import json

class VectorStore:
    def __init__(self): self.records=[]; self.matrix=None
    def save_metadata(self,path):
        Path(path).write_text(json.dumps(self.records,ensure_ascii=False,indent=2),encoding='utf-8')
