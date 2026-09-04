from query.query_generator import generate_queries

class Retriever:
    def __init__(self,searcher): self.searcher=searcher
    def retrieve_for_product(self,product,top_k=8):
        results=[]
        for q in generate_queries(product):
            hits=self.searcher.search(q['query'],top_k=top_k)
            results.extend([{**h,'queryType':q['type']} for h in hits])
        return results
    def retrieve_for_question(self,question,top_k=8):
        return self.searcher.search(question,top_k=top_k)
