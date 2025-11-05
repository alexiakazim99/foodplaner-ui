import { useState } from "react";
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const addIngredient = () => {
    if (ingredient.trim() === "") return;
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");
  };

  const removeIngredient = (index) => {
    setIngredientList(ingredientList.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>FoodPlanner 🍽</h1>

      <div className="input-area">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Skriv en ingrediens..."
        />
        <button onClick={addIngredient}>Lägg till</button>
      </div>

      <ul className="ingredient-list">
        {ingredientList.map((ing, index) => (
          <li key={index}>
            {ing}
            <button onClick={() => removeIngredient(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
