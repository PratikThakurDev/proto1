from classification.classifier import classify
from .ip_analysis import analyze_ip
from .regulatory_analysis import analyze_regulatory
from .tkabs_analysis import analyze_tkabs
from .market_analysis import analyze_markets
from retrieval.evidence import evidence_cards
from retrieval.reranker import rerank

def run(product,retrieved):
    ranked=rerank(retrieved,limit=12)
    c=classify(product,ranked)
    return {'classification':c,'ip':analyze_ip(product,ranked),'regulatory':analyze_regulatory(product,ranked),'tkAbs':analyze_tkabs(product,ranked),'markets':analyze_markets(product,ranked),'evidence':evidence_cards(ranked),'recommendations':['Complete IP clearance before launch','Validate product classification and claims','Document traditional knowledge and biological-resource provenance','Review target-market requirements']}
