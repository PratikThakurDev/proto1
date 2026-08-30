from datetime import datetime, timezone
from .retrieval import retrieve

CLASSIFICATIONS = ["Ayurvedic Medicine", "Nutraceutical / Food", "Cosmetic", "Other"]


def _classify(product: dict, evidence: list[dict]):
    text = " ".join(str(v) for v in product.values()).lower()
    if any(k in text for k in ["cream", "lotion", "serum", "soap", "shampoo", "cosmetic"]):
        return "Cosmetic"
    if any(k in text for k in ["capsule", "tablet", "churna", "kwath", "ayurvedic medicine", "therapeutic", "treat"]):
        return "Ayurvedic Medicine"
    if any(k in text for k in ["food", "drink", "beverage", "nutrition", "nutraceutical", "supplement"]):
        return "Nutraceutical / Food"
    for row in evidence:
        c = row["metadata"].get("classification", "")
        if c in CLASSIFICATIONS:
            return c
    return "Other"


def build_passport(product: dict):
    query = " ".join([
        str(product.get("name", "")),
        str(product.get("description", "")),
        str(product.get("ingredients", "")),
        str(product.get("intended_use", "")),
        str(product.get("traditional_knowledge", "")),
    ]).strip()
    evidence = retrieve(query or "Ayurveda product classification and IP regulations")
    category = _classify(product, evidence)

    top_sources = []
    for row in evidence:
        m = row["metadata"]
        top_sources.append({
            "record_id": m.get("record_id"),
            "title": m.get("title"),
            "source": m.get("source"),
            "url": m.get("source_url"),
            "classification": m.get("classification"),
            "distance": row.get("distance"),
        })

    return {
        "product_name": product.get("name", ""),
        "category": category,
        "intended_use": product.get("intended_use", ""),
        "ingredients": product.get("ingredients", ""),
        "traditional_knowledge": product.get("traditional_knowledge", False),
        "target_market": product.get("target_market", "India"),
        "development_stage": product.get("development_stage", "Prototype"),
        "date_of_analysis": datetime.now(timezone.utc).isoformat(),
        "reason": f"The classification is based on the product inputs plus the closest retrieved knowledge records. Prototype classification: {category}.",
        "evidence": top_sources,
        "confidence": "high" if len(evidence) >= 3 else ("medium" if evidence else "low"),
        "disclaimer": "Prototype decision support only; verify applicable law and official sources before commercial/legal action.",
    }
