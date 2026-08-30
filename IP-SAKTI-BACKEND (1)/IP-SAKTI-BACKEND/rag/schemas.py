from typing import Any
from pydantic import BaseModel, Field

class ProductInput(BaseModel):
    name: str = Field(min_length=1)
    description: str = ""
    ingredients: str = ""
    intended_use: str = ""
    traditional_knowledge: bool = False
    target_market: str = "India"
    development_stage: str = "Prototype"

class AssessRequest(ProductInput):
    jurisdiction: str = "India"

class ChatRequest(BaseModel):
    question: str = Field(min_length=1)
    product: dict[str, Any] = Field(default_factory=dict)
    jurisdiction: str = "India"
    top_k: int = Field(default=5, ge=1, le=20)
