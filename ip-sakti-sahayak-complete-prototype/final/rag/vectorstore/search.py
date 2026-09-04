from sklearn.metrics.pairwise import cosine_similarity

class VectorSearcher:
    def __init__(self,index): self.index=index
    def search(self,query,top_k=8,source=None):
        if not self.index.records: self.index.build()
        q=self.index.embedder.transform([query])
        scores=cosine_similarity(q,self.index.matrix).ravel()
        candidates=[]
        for i,s in enumerate(scores):
            r=self.index.records[i]
            if source and r.get('source') != source: continue
            candidates.append((float(s),r))
        candidates.sort(key=lambda x:x[0],reverse=True)
        return [{**r,'score':round(score,4)} for score,r in candidates[:top_k]]
