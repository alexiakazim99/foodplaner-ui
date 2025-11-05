import { useState } from "./data/recipes"; 
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const [servings, setServings] = useState(3);
  const [diet, setDiet] = useState("regular");
  const [days, setDays] = useState(7);

  const [recipes, setRecipes] = useState([]);

  const addIngredient = () => {
    if (ingredient.trim() === "") return;
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");
  };

  const removeIngredient = (index) => {
    setIngredientList(ingredientList.filter((_, i) => i !== index));
  };

  const fetchRecipes = () => {
  const filtered = recipesData.filter(recipe =>
    recipe.persons === Number(servings) &&
    recipe.diet === diet &&
    ingredientList.every(ing =>
      recipe.ingredients.includes(ing.toLowerCase())
    )
  );

  setRecipes(filtered.slice(0, days));
};

  return (
    <div className="container">
      <h1>FoodPlanner 🍽</h1>

      <div className="input-area">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter an ingredient..."
        />
        <button onClick={addIngredient}>Add</button>
      </div>

      <ul className="ingredient-list">
        {ingredientList.map((ing, index) => (
          <li key={index}>
            {ing}
            <button onClick={() => removeIngredient(index)}>❌</button>
          </li>
        ))}
      </ul>

      <div className="filters">
        <label>Number of people:</label>
        <select value={servings} onChange={(e) => setServings(e.target.value)}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label>Diet type:</label>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="regular">Regular</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
        </select>

        <label>Days of meal plan:</label>
        <select value={days} onChange={(e) => setDays(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <button className="generate-btn" onClick={fetchRecipes}>
        Generate recipes 🔍
      </button>

      <div className="recipe-results">
        {recipes.length > 0 && <h2>Recipe Suggestions</h2>}
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
