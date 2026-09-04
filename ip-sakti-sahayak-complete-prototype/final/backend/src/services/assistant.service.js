import { ragAssistant } from '../rag-client/rag.client.js';
export async function ask({ message, language='en', history=[] }) {
  try { const result=await ragAssistant(message,history); return {...result,language,confidence:result.evidence?.[0]?.relevance || 0.5}; }
  catch { return {message,answer:'The RAG service is not available yet. Start the Python RAG service on port 8000 and try again.',language,confidence:0,citations:[],evidence:[]}; }
}
