def analyze_tkabs(product,evidence):
    hits=[e for e in evidence if e.get('source') in {'TKDL','NBA_ABS'}]
    return {'score':max(50,min(92,58+len(hits)*3)),'risk':'Review Required' if hits else 'Low','requirements':['Assess traditional knowledge relevance','Assess biological-resource provenance','Document source/access conditions where applicable'],'matchedRecords':len(hits)}
