def analyze_ip(product,evidence):
    hits=[e for e in evidence if e.get('source') in {'PATENT','TRADEMARK','DESIGN','GI'}]
    score=max(35,min(95,88-len(hits)*2+int(sum(e.get('score',0) for e in hits)*3))) if hits else 62
    return {'score':score,'risk':'Low-Medium' if score>=70 else 'Medium','findings':['Review patent novelty and inventive step','Run trademark clearance','Check design/GI overlap where relevant'],'matchedRecords':len(hits)}
