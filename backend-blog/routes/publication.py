from fastapi import APIRouter, HTTPException
from database import get_all_publications, create_publication, get_one_publication, get_one_publication_id, delete_publication, update_publication
from models.publication import Publication
from models.updatePublication import UpdatePublication


publication = APIRouter()


@publication.get("/api/publications")
async def get_publications():
    try:
        publications = await get_all_publications()
        return publications
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@publication.post("/api/publications", response_model=Publication)
async def save_publication(publication: Publication):
    publicationFound = await get_one_publication(publication.title)
    if publicationFound:
        raise HTTPException(
            status_code=409, detail="Publication already exists")
    response = await create_publication(publication.model_dump())
    if response:
        return response
    raise HTTPException(status_code=400, detail="Bad Request")


@publication.get("/api/publications/{id}", response_model=Publication)
async def get_publication(id: str):
    publication = await get_one_publication_id(id)
    if publication:
        return publication
    raise HTTPException(404, f"Publication with id {id} not found")


@publication.put("/api/publications/{id}", response_model=Publication)
# UpdatePublication is a model for the update request body
async def put_publication(id: str, publication: UpdatePublication):
    response = await update_publication(id, publication)
    if response:
        return response
    return HTTPException(404, f"Publication with id {id} not found")


@publication.delete("/api/publications/{id}")
async def remove_publication(id: str):
    response = await delete_publication(id)
    if response:
        return "Succesfully publication deleted"
    raise HTTPException(404, f"Publication with id {id} not found")
