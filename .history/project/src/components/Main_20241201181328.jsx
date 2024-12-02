// React imports
import { useState } from "react";
// Component imports
import Form from "./Form";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  function addIngredient(ingredient) {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  }

  return (
    <main className="main-container">
      <Form />
    </main>
  );
}
