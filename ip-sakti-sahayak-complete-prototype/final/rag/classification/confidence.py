def confidence_for(evidence):
    if not evidence: return 0.25
    unique=len({e.get('source') for e in evidence})
    avg=sum(e.get('score',0) for e in evidence)/len(evidence)
    return round(min(0.97,0.45+0.08*unique+0.25*avg),2)
