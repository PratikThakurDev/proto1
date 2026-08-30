from pymongo import MongoClient
from .config import settings

_client = None
_db = None


def get_db():
    global _client, _db
    if not settings.mongodb_uri:
        return None
    if _db is None:
        _client = MongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)
        _db = _client[settings.mongodb_db]
    return _db


def save_passport(passport: dict):
    db = get_db()
    if db is None:
        return None
    result = db.product_passports.insert_one(passport)
    return str(result.inserted_id)


def ping():
    db = get_db()
    if db is None:
        return {"configured": False, "connected": False}
    db.command("ping")
    return {"configured": True, "connected": True, "database": settings.mongodb_db}
