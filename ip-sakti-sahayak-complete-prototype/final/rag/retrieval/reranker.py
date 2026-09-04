def rerank(records,limit=12):
    seen=set(); unique=[]
    for r in sorted(records,key=lambda x:x.get('score',0),reverse=True):
        if r['id'] not in seen:
            seen.add(r['id']); unique.append(r)
    return unique[:limit]
