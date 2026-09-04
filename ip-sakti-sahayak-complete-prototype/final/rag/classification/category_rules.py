CATEGORIES=['Ayurvedic Product','Herbal Formulation','Traditional Knowledge Associated Product','TK/ABS Review Required','Regulatory Review Required','Insufficient Evidence']

def rule_signals(product,evidence):
    text=(product.get('description','')+' '+product.get('intendedUse','')+' '+' '.join(product.get('ingredients',[]) if isinstance(product.get('ingredients',[]),list) else [str(product.get('ingredients',''))])).lower()
    sources={e.get('source') for e in evidence}
    signals=[]
    if any(x in text for x in ['ayur','herbal','capsule','tablet','powder','oil','syrup']): signals.append('product characteristics indicate an herbal/Ayurvedic context')
    if 'TKDL' in sources: signals.append('traditional-knowledge evidence was retrieved')
    if 'INDIA_CODE' in sources: signals.append('regulatory statute/rule evidence was retrieved')
    if 'NBA_ABS' in sources: signals.append('biodiversity/ABS evidence was retrieved')
    return signals
