def chunk_record(record, max_chars=900):
    text=record.get('text','')
    if len(text)<=max_chars: return [record]
    out=[]
    for start in range(0,len(text),max_chars):
        item=dict(record); item['text']=text[start:start+max_chars]; item['chunk']=start//max_chars+1; out.append(item)
    return out
