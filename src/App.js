import { useState } from "react";
import "./App.css";

function App() {
  // State för ingredienshantering
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  // Filter (3 personer, kosttyp, 7 dagar)
  const [servings, setServings] = useState(3);       // 3 personer
  const [diet, setDiet] = useState("normal");        // Allmän kost default
  const [days, setDays] = useState(7);               // 7 dagar (1 vecka)

  // Här sparas recepten som kommer från Spoonacular via backend
  const [recipes, setRecipes] = useState([]);

  // Lägg till ingrediens
  const addIngredient = () => {
    if (ingredient.trim() === "") return;
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");
  };

  //  Ta bort ingrediens
  const removeIngredient = (index) => {
    setIngredientList(ingredientList.filter((_, i) => i !== index));
  };

  // Hämtar recept från backend → backend kontaktar Spoonacular
  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/recipes?ingredients=${ingredientList.join(",")}&servings=${servings}&diet=${diet}&days=${days}`
      );

      const data = await response.json();
      setRecipes(data); // sparar recepten så vi kan visa dem
    } catch (error) {
      console.error("Kunde inte hämta recept:", error);
    }
  };

  return (
    <div className="container">
      <h1>FoodPlanner 🍽</h1>

      {/* Input för att lägga till ingrediens */}
      <div className="input-area">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Skriv en ingrediens..."
        />
        <button onClick={addIngredient}>Lägg till</button>
      </div>

      {/*  Lista med ingredienser */}
      <ul className="ingredient-list">
        {ingredientList.map((ing, index) => (
          <li key={index}>
            {ing}
            <button onClick={() => removeIngredient(index)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Filter */}
      <div className="filters">
        <label>Antal personer:</label>
        <select value={servings} onChange={(e) => setServings(e.target.value)}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label>Kosttyp:</label>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="normal">Allmän kost</option>
          <option value="vegetarian">Vegetarisk</option>
          <option value="lactose-free">Laktosfri</option>
        </select>

        <label>Antal dagar:</label>
        <select value={days} onChange={(e) => setDays(e.target.value)}>
          <option value={7}>1 vecka (7 dagar)</option>
        </select>
      </div>

      {/*  Knapp som hämtar recept */}
      <button className="generate-btn" onClick={fetchRecipes}>
        Generera recept 🍳
      </button>

      {/* Visa recept som kommer från Spoonacular */}
      <div className="recipe-results">
        {recipes.length > 0 && <h2>Receptförslag</h2>}

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
