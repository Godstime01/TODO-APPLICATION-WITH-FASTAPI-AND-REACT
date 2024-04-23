from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import (
    fetch_all_todos,
    fetch_one_todo,
    update_todo,
    remove_todo, create_todo, Todo
)


app = FastAPI()
origins = ["http://localhost:5173", 'http://localhost*']


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

@app.get("/api/todo")
async def get_all_todo():
    response = await fetch_all_todos() 
    return response

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo(title):
    response = await fetch_one_todo(title)

    if response:
        return response
    raise HTTPException(404, f"Todo item could not be found {title}")

@app.post("/api/todo")
async def post_todo(todo:Todo):
    response = await create_todo(todo.dict())

    if response:
        return response
    raise HTTPException(400, 'Bad request')

@app.put("/api/todo/{title}", response_model=Todo)
async def update_todo(title:str, description:str):
    response = await update_todo(title, description)

    if response:
        return response
    raise HTTPException(400, 'Bad request')

@app.delete("api/todo/{title}")
async def delete_todo(title):
    response = await remove_todo(title)

    if response:
        return {"message": "Couldn't delete item"}
    
    raise HTTPException(400, 'Bad request')
