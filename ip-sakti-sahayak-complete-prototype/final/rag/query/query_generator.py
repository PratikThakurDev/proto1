def _ingredients(product):
    items=product.get('ingredients',[])
    if isinstance(items,str): items=[x.strip() for x in items.split(',') if x.strip()]
    return items

def generate_queries(product):
    name=product.get('name',''); desc=product.get('description',''); use=product.get('intendedUse',''); form=product.get('formulation','')
    ingredients=', '.join(_ingredients(product))
    base=f'{name} {ingredients} {form} {use} {desc}'.strip()
    return [
      {'type':'ip','query':f'{base} patent trademark design GI intellectual property'},
      {'type':'regulatory','query':f'{base} product classification statute rule regulatory licensing labelling claims'},
      {'type':'tk_abs','query':f'{base} traditional knowledge TKDL biological resource biodiversity ABS'},
      {'type':'market','query':f'{base} India USA UK Japan market readiness labelling regulatory IP'},
    ]
