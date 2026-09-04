from sklearn.feature_extraction.text import TfidfVectorizer

class Embedder:
    def __init__(self): self.vectorizer=TfidfVectorizer(ngram_range=(1,2),min_df=1)
    def fit(self,texts): return self.vectorizer.fit_transform(texts)
    def transform(self,texts): return self.vectorizer.transform(texts)
