import axios from 'axios';
const base = process.env.RAG_URL || 'http://127.0.0.1:8000';
export async function ragAnalyze(product){ const {data}=await axios.post(`${base}/analyze`,product,{timeout:30000}); return data; }
export async function ragAssistant(message,history=[]){ const {data}=await axios.post(`${base}/assistant`,{message,history,top_k:8},{timeout:30000}); return data; }
export async function ragHealth(){ const {data}=await axios.get(`${base}/health`,{timeout:5000}); return data; }
