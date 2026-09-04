def normalize_metadata(record):
    record=dict(record)
    record['source']=record.get('source','UNKNOWN').upper()
    record['keywords']=list(dict.fromkeys(record.get('keywords',[])))
    return record
