from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Any, Optional
from vectorstore.index import RAGIndex
from vectorstore.search import VectorSearcher
from retrieval.retriever import Retriever
from analysis.analysis_engine import run
from reports.report_builder import build_report

app=FastAPI(title='IP-SAKTI RAG Prototype',version='1.0.0')
index=RAGIndex(); searcher=VectorSearcher(index); retriever=Retriever(searcher)

class Product(BaseModel):
    name:str=''; description:str=''; intendedUse:str=''; ingredients:list[Any]=Field(default_factory=list); formulation:str=''; stage:str=''; markets:list[str]=Field(default_factory=list); answers:dict[str,Any]=Field(default_factory=dict)
class AssistantRequest(BaseModel):
    message:str; history:list[Any]=Field(default_factory=list); top_k:int=8

@app.on_event('startup')
def startup(): index.build()

@app.get('/health')
def health(): return {'ok':True,'service':'rag','records':len(index.records),'vectorizer':'tfidf'}

@app.post('/retrieve')
def retrieve(payload:dict):
    q=payload.get('query',''); source=payload.get('source'); top_k=int(payload.get('top_k',8))
    return {'query':q,'results':searcher.search(q,top_k=top_k,source=source)}

@app.post('/analyze')
def analyze(product:Product):
    data=product.model_dump(); retrieved=retriever.retrieve_for_product(data,top_k=6); result=run(data,retrieved)
    result['report']=build_report(data,result)
    return result

@app.post('/assistant')
def assistant(req:AssistantRequest):
    from assistant.assistant_engine import answer
    return answer(req.message,searcher,req.history,req.top_k)
