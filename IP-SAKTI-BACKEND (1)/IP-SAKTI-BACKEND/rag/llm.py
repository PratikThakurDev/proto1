from typing import Any
from .config import settings

SYSTEM_PROMPT = """You are IP-SAKTI Sahayak, an AI assistant for intellectual-property and regulatory navigation related to Ayurveda.
Use ONLY the supplied retrieved evidence for factual legal/regulatory claims.
Never invent laws, sections, dates, authorities, patent status, or citations.
If evidence is insufficient, say that the evidence is insufficient and recommend verification from the cited official source.
Give a concise explanation, relevant evidence, confidence, and practical next steps.
This is guidance, not legal advice.
"""


def generate_answer(question: str, context: str) -> dict[str, Any]:
    if not settings.openai_api_key:
        return {
            "answer": "RAG retrieval completed, but no LLM API key is configured. Review the retrieved evidence below.",
            "confidence": "medium" if context else "low",
            "llm_used": False,
        }

    from openai import OpenAI
    client = OpenAI(api_key=settings.openai_api_key)
    response = client.chat.completions.create(
        model=settings.openai_model,
        temperature=0.1,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Question:\n{question}\n\nRetrieved evidence:\n{context}"},
        ],
    )
    return {
        "answer": response.choices[0].message.content or "No answer generated.",
        "confidence": "high" if context else "low",
        "llm_used": True,
    }
