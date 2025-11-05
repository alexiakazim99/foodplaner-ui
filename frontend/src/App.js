import { useState } from "react";
import "./App.css";
import { recipes } from "./recipes"; // <-- viktigt: samma namn som export i recipes.js

function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const [servings, setServings] = useState(3);
  const [diet, setDiet] = useState("regular");
  const [days, setDays] = useState(7);

  const [recipesResult, setRecipesResult] = useState([]);

  const addIngredient = () => {
    if (ingredient.trim() === "") return;
    setIngredientList([...ingredientList, ingredient.toLowerCase()]);
    setIngredient("");
  };

  const removeIngredient = (index) => {
    setIngredientList(ingredientList.filter((_, i) => i !== index));
  };

  // ✅ HÄR filtreras recepten från recipes.js dataset
  const fetchRecipes = () => {
    const filteredRecipes = recipes.filter((recipe) => {
      const servingsMatch = recipe.servings === Number(servings);
      const dietMatch = recipe.diet === diet;

      // ingrediensmatch: minst 1 matchar
      const ingredientsMatch = ingredientList.every((ing) =>
        recipe.ingredients.some((item) => item.toLowerCase().includes(ing))
      );

      return servingsMatch && dietMatch && ingredientsMatch;
    });

    // visa max antal dagar
    setRecipesResult(filteredRecipes.slice(0, days));
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
          <option value="lactose-free">Lactose-Free</option>
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
        {recipesResult.length > 0 && <h2>Recipe Suggestions</h2>}

        {recipesResult.map((recipe, index) => (
          <div key={recipe.id} className="recipe-card">
            <h3>Day {index + 1}: {recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="200" />
            <p><b>Ingredients:</b> {recipe.ingredients.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
