from query.query_rewriter import rewrite
from retrieval.evidence import evidence_cards
from llm.llm_client import LLMClient
from llm.structured_output import assistant_output

def answer(question,searcher,history=None,top_k=8):
    q=rewrite(question,history)
    hits=searcher.search(q,top_k=top_k)
    evidence=evidence_cards(hits)
    text=LLMClient().answer(question,evidence)
    return assistant_output(text,evidence)
