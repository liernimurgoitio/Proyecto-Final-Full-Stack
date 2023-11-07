from fastapi import APIRouter, HTTPException
from database import get_all_articles, get_one_article, create_article, get_one_article_id, update_article, delete_article
from models.article import Article
from models.updateArticle import UpdateArticle

article = APIRouter()


@article.get("/api/articles")
async def get_articles():
    try:
        articles = await get_all_articles()
        return articles
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@article.post("/api/articles", response_model=Article)
async def save_article(article: Article):
    articleFound = await get_one_article(article.title)
    if articleFound:
        raise HTTPException(status_code=409, detail="Article already exists")
    response = await create_article(article.model_dump())
    if response:
        return response
    raise HTTPException(status_code=400, detail="Bad Request")


@article.get("/api/articles/{id}", response_model=Article)
async def get_article(id: str):
    article = await get_one_article_id(id)
    if article:
        return article
    raise HTTPException(404, f"Article with id {id} not found")


@article.put("/api/articles/{id}", response_model=Article)
# UpdateArticle is a model for the update request body
async def put_article(id: str, article: UpdateArticle):
    response = await update_article(id, article)
    if response:
        return response
    return HTTPException(404, f"Article with id {id} not found")


@article.put("/api/articles/{id}")
async def edit_article(id: str, article_db: Article, articles_db):
    for i, a in enumerate(articles_db):
        if str(a.id) == id:
            articles_db[i] = article
            return article
    return {"message": "Artículo no encontrado"}


@article.delete("/api/articles/{id}")
async def remove_article(id: str):
    response = await delete_article(id)
    if response:
        return "Succesfully article deleted"
    raise HTTPException(404, f"Article with id {id} not found")
