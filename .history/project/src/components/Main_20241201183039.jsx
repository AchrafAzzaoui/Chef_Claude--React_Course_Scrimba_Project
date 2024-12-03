// React imports
import { useState } from "react";
// Component imports
import Form from "./Form";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  function addIngredient(ingredient) {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  }

  let ingredientsHTML = ingredients.map((ingredient, index) => {
    return (
      <li key={ingredient}>
        {index + 1}: {ingredient}
      </li>
    );
  });

  return (
    <main className="main-container">
      <Form addIngredient={addIngredient} />
      <ul>{ingredientsHTML}</ul>
    </main>
  );
}
