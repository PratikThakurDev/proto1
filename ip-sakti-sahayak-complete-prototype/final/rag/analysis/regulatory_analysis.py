def analyze_regulatory(product,evidence):
    hits=[e for e in evidence if e.get('source')=='INDIA_CODE']
    return {'score':max(55,min(92,60+len(hits)*4)),'risk':'Medium','requirements':['Confirm product classification','Review licensing pathway','Review labelling and claims','Maintain quality/safety documentation'],'matchedRecords':len(hits)}
