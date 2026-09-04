from .category_rules import rule_signals
from .confidence import confidence_for

def classify(product,evidence):
    text=(product.get('name','')+' '+product.get('description','')+' '+product.get('intendedUse','')).lower()
    category='Ayurvedic Product' if any(x in text for x in ['ayur','herbal','triphala','ashwagandha','turmeric','brahmi','neem']) else 'Herbal Formulation'
    conf=confidence_for(evidence)
    return {'category':category,'confidence':conf,'signals':rule_signals(product,evidence)}
