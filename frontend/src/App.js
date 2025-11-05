import { useState } from "react";
import "./App.css";
import { recipes } from "./recipes";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const [servings, setServings] = useState(3);
  const [diet, setDiet] = useState("regular");
  const [days, setDays] = useState(7);

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const addIngredient = () => {
    if (ingredient.trim() === "") return;
    setIngredientList([...ingredientList, ingredient.toLowerCase()]);
    setIngredient("");
  };

  const removeIngredient = (index) => {
    setIngredientList(ingredientList.filter((_, i) => i !== index));
  };

  const fetchRecipes = () => {
    console.log("Searching with:", { ingredientList, servings, diet, days });

    let result = recipes.filter(recipe => {
      // 1. Kolla diet
      const dietMatch = diet === "regular" || recipe.diet === diet;
      
      // 2. Kolla ingredienser (OM användaren angett några)
      const ingredientMatch = ingredientList.length === 0 || 
        ingredientList.some(userIng =>
          recipe.ingredients.some(recipeIng => 
            recipeIng.toLowerCase().includes(userIng.toLowerCase())
          )
        );

      return dietMatch && ingredientMatch;
    });

    console.log("Found recipes:", result.length);

    // Ta max antal dagar
    setFilteredRecipes(result.slice(0, Number(days)));
  };

  return (
    <div className="container">
      <h1>FoodPlanner 🍽</h1>

      {/* INGREDIENT INPUT */}
      <div className="input-area">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addIngredient()}
          placeholder="Enter an ingredient..."
        />
        <button onClick={addIngredient}>Add</button>
      </div>

      {/* INGREDIENT LIST */}
      {ingredientList.length > 0 && (
        <ul className="ingredient-list">
          {ingredientList.map((ing, index) => (
            <li key={index}>
              {ing}
              <button onClick={() => removeIngredient(index)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      {/* FILTERS */}
      <div className="filters">
        <label>Number of people:</label>
        <select value={servings} onChange={(e) => setServings(e.target.value)}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label>Diet type:</label>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="regular">Regular</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lactose-free">Lactose-Free</option>
        </select>

        <label>Days of meal plan:</label>
        <select value={days} onChange={(e) => setDays(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <button className="generate-btn" onClick={fetchRecipes}>
        Generate recipes 🔍
      </button>

      {/* RESULTS */}
      <div className="recipe-results">
        {filteredRecipes.length > 0 && <h2>Recipe Suggestions ({filteredRecipes.length})</h2>}
        
        {filteredRecipes.length === 0 && ingredientList.length > 0 && (
          <p>No recipes found with those ingredients 😢 Try fewer or different ones!</p>
        )}

        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width="200" />
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;