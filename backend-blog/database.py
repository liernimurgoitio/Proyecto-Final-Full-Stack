from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from models.article import Article
from models.publication import Publication


# Conexion a la base de datos
client = AsyncIOMotorClient('mongodb://localhost:27017')
database = client['my_blog']  # Conexion a la base de datos 'my_blog'
collection_articles = database['articles'] # Conexion a la coleccion 'articles'
collection_publications = database['publications'] # Conexion a la coleccion 'publications'
collection_users = database['users'] # Conexion a la coleccion 'users'


# Funciones a implementar para 'users'
async def verify_credentials(username: str, password: str) -> bool:
    # Buscar el usuario en la colección por su nombre de usuario
    user = await collection_users.find_one({"username": username})
    # Verificar si se encontró el usuario y si la contraseña coincide
    if user and user["password"] == password:
        return True

    return False

# Funciones a implementar para 'articles'

async def get_one_article_id(id):  # Funcion para obtener un articulo por su id
    # Obtenemos el articulo por su id
    article = await collection_articles.find_one({"_id": ObjectId(id)})
    return article  # Devolvemos el articulo


# Funcion para obtener un articulo por su titulo
async def get_one_article(title):
    # Obtenemos el articulo por su titulo
    article = await collection_articles.find_one({'title': title})
    return article  # Devolvemos el articulo

async def get_all_articles():  # Funcion para obtener todos los articulos de la coleccion 'articles'
    articles = []  # Obtenemos todos los articulos de la coleccion 'articles'
    # Creamos un cursor para obtener los articulos de la coleccion 'articles'
    cursor = collection_articles.find({})
    async for document in cursor:  # Iteramos por cada articulo de la coleccion 'articles'
        # Agregamos el articulo al array de articles
        articles.append(Article(**document))
    return articles  # Devolvemos los articles

async def create_article(article):  # Funcion para crear un articulo
    # Insertamos el articulo en la coleccion 'articles'
    new_article = await collection_articles.insert_one(article)
    # Devolvemos el articulo creado
    created_article = await collection_articles.find_one({"_id": new_article.inserted_id})
    return created_article  # Devolvemos el articulo


async def update_article(id: str, data):  # Funcion para actualizar un articulo
    # Creamos un diccionario para actualizar el articulo KEY:VALUE que no sea None
    article = {k: v for k, v in data.dict().items() if v is not None}
    # Imprimimos el articulo para verificar que se actualizo correctamente
    print(article)
    # Actualizamos el articulo en la coleccion 'articles'
    await collection_articles.update_one({'_id': ObjectId(id)}, {'$set': article})
    # Obtenemos el articulo actualizado
    document = await collection_articles.find_one({'_id': ObjectId(id)})
    return document  # Devolvemos el articulo actualizado


async def edit_article(id: str, article: Article, articles_db):
    article_dict = {str(a._id): a for a in articles_db}
    if id in article_dict:
        articles_db[article_dict[id]] = article
        return article
    return {"message": "Article not found"}


async def delete_article(id: str):  # Funcion para eliminar un articulo
    # Eliminamos el articulo en la coleccion 'articles' por su id
    await collection_articles.delete_one({'_id': ObjectId(id)})
    return True  # Devolvemos True para indicar que se elimino el articulo correctamente

# FUNCIONES A IMPLEMENTAR 'publications'


# Funcion para obtener una publicacion por su id
async def get_one_publication_id(id):
    # Obtenemos publicacion por su id
    publication = await collection_publications.find_one({"_id": ObjectId(id)})
    return publication  # Devolvemos publicacion


# Funcion para obtener publicacion por su titulo
async def get_one_publication(title):
    # Obtenemos publicacion por su titulo
    publication = await collection_publications.find_one({'title': title})
    return publication  # Devolvemos publicacion


async def get_all_publications():  # Funcion para obtener todas las publicaciones de la coleccion 'publications'
    publications = []  # Obtenemos todas publicaciones de la coleccion 'publications'
    # Creamos un cursor para obtener publicaciones de la coleccion 'publications'
    cursor = collection_publications.find({})
    async for document in cursor:  # Iteramos por cada publicacion de la coleccion 'publications'
        # Agregamos publicacion al array de publications
        publications.append(Publication(**document))
    return publications  # Devolvemos publicacion


async def create_publication(publication):  # Funcion para crear publicacion
    # Insertamos publicacion en la coleccion 'publications'
    new_publication = await collection_publications.insert_one(publication)
    # Devolvemos publicacion creada
    created_publication = await collection_publications.find_one({"_id": new_publication.inserted_id})
    return created_publication  # Devolvemos publicacion


# Funcion para actualizar publicacion
async def update_publication(id: str, data):
    # Creamos un diccionario para actualizar la publicacion KEY:VALUE que no sea None
    publication = {k: v for k, v in data.dict().items() if v is not None}
    # Imprimimos publicacion para verificar que se actualizo correctamente
    print(publication)
    # Actualizamos publicacion en la coleccion 'publications'
    await collection_publications.update_one({'_id': ObjectId(id)}, {'$set': publication})
    # Obtenemos publicacion actualizado
    document = await collection_publications.find_one({'_id': ObjectId(id)})
    return document  # Devolvemos publicacion actualizada


async def delete_publication(id: str):  # Funcion para eliminar publicacion
    # Eliminamos publicacion en la coleccion 'publications' por su id
    await collection_publications.delete_one({'_id': ObjectId(id)})
    return True  # Devolvemos True para indicar que se elimino la publicacion correctamente

