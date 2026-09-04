class LLMClient:
    """Optional LLM adapter. Prototype works without an external LLM."""
    def answer(self,question,evidence):
        if not evidence:
            return 'I could not find sufficiently relevant evidence in the 500-record prototype knowledge base.'
        sources=', '.join(dict.fromkeys(e['source'] for e in evidence[:5]))
        return f'Based on the prototype evidence, the most relevant source groups are {sources}. Review the cited records before making a legal or regulatory decision.'
