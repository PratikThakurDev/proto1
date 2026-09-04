def build_report(product, analysis):
    return {
        'title': f"Full Product Analysis Report – {product.get('name', 'Product')}",
        'product': product,
        'analysis': analysis.copy(),
        'prototypeNotice': 'This report is generated from the 500-record prototype knowledge base and is not legal advice.'
    }