from pathlib import Path
import json

DATA_DIR = Path(__file__).resolve().parents[1] / 'data'

def load_records():
    records=[]
    for path in sorted(DATA_DIR.rglob('*.json')):
        with path.open(encoding='utf-8') as f:
            data=json.load(f)
        if isinstance(data,list): records.extend(data)
    return records
