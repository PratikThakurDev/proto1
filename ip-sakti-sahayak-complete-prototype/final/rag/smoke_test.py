from api.rag_api import index, searcher

count=index.build()
assert count==500, count
hits=searcher.search('ashwagandha herbal formulation patent',top_k=5)
assert hits, 'no retrieval results'
print('RAG smoke test OK')
print('records:', count)
print('top:', hits[0]['id'], hits[0]['source'], hits[0]['score'])
