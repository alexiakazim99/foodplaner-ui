from fastapi import FastAPI, Query
import requests

app = FastAPI()
SPOONACULAR_API_KEY = "7a6ed318198248a086569bc95cb4eccf"

@app.get("/recipes")
def get_recipes(
    ingredients: str = Query(...),
    servings: int = Query(3),
    diet: str = Query("normal"),
    days: int = Query(7)
):
    url = "https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        "ingredients": ingredients,
        "number": 5,
        "apiKey": SPOONACULAR_API_KEY
    }
    response = requests.get(url, params=params)
    return response.json()