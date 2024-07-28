from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

SPOONACULAR_API_KEY = 'your_spoonacular_api_key_here'
SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes/complexSearch'

def fetch_recipes(diet=None, max_calories=None):
    params = {
        'apiKey': SPOONACULAR_API_KEY,
        'number': 1,  # number of recipes to fetch
    }
    if diet:
        params['diet'] = diet
    if max_calories:
        params['maxCalories'] = max_calories

    response = requests.get(SPOONACULAR_API_URL, params=params)
    if response.status_code == 200:
        return response.json()['results']
    else:
        return []

@app.route('/api/recipe', methods=['GET'])
def get_recipe():
    diet = request.args.get('diet')
    max_calories = request.args.get('max_calories', type=int)
    recipes = fetch_recipes(diet, max_calories)
    if recipes:
        return jsonify(recipes[0])
    else:
        return jsonify({'error': 'No recipe found'}), 404

if __name__ == '__main__':
    app.run(debug=True)