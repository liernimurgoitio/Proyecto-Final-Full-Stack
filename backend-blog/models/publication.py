from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value, values):
        if not ObjectId.is_valid(value):
            raise ValueError("Invalid objectid")
        return str(value)


class Publication(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias='_id')
    title: str
    content: Optional[str] = None
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True  # populate by name not by default
        from_attributes = True  # from_attributes is not default
        json_encoders = {ObjectId: str}  # encode objectid to string
        json_shema_extra = {
            'example': {
                "id": "5f48d8f50106110016a00001",  # id is a string in the database
                "title": "My first publication",  # title is a string in the database
                # content is a string in the database
                "content": "This is my first publication",
                # created_at is a datetime object in the database
                "created_at": "2021-01-01T10:00:00.000Z",
                # updated_at is a datetime object in the database
                "updated_at": "2021-01-01T10:00:00.000Z"
            }
        }
