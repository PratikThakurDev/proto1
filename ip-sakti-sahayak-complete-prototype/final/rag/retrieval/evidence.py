def evidence_cards(records):
    return [{'id':r['id'],'source':r['source'],'sourceType':r.get('sourceType'),
             'title':r['title'],'relevance':r.get('score',0),'excerpt':r.get('text','')[:280],
             'sample':r.get('sample',False)} for r in records]
