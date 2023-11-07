from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId


class UpdateArticle(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    updated_at: Optional[datetime] = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True
        from_attributes = True
        json_encoders = {ObjectId: str}
        json_shema_extra = {
            'example': {
                "id": "5f48d8f50106110016a00001",
                "title": "My first article",
                "content": "This is my first article",
                "updated_at": "2021-01-01T10:00:00.000Z"
            }
        }
