import { useState } from "react";
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

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/recipes?ingredients=${ingredientList.join(",")}&servings=${servings}&diet=${diet}&days=${days}`
      );
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="container">
      <h1>FoodPlanner 🍽</h1>

      <div className="input-area">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Type an ingredient..."
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
        <label>Number of servings:</label>
        <select value={servings} onChange={(e) => setServings(e.target.value)}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label>Diet preference:</label>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="regular">Regular</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="lactose-free">Lactose-free</option>
          <option value="gluten-free">Gluten-free</option>
        </select>

        <label>Number of days:</label>
        <select value={days} onChange={(e) => setDays(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <option key={day} value={day}>
              {day} {day === 1 ? "day" : "days"}
            </option>
          ))}
        </select>
      </div>

      <button className="generate-btn" onClick={fetchRecipes}>
        Generate recipes 🔍
      </button>

      <div className="recipe-results">
        {recipes.length > 0 && <h2>Suggested Recipes</h2>}
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
