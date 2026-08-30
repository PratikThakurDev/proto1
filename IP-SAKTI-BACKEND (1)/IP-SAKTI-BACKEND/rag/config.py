from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    mongodb_uri: str = ""
    mongodb_db: str = "ipsakti"
    chroma_path: str = str(ROOT / "chroma_db")
    collection_name: str = "ipsakti_knowledge"
    dataset_path: str = str(ROOT / "data" / "prototype_500_records.jsonl")
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    top_k: int = 5
    max_context_chars: int = 12000

    model_config = SettingsConfigDict(
        env_file=str(ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()
