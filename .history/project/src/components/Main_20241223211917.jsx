// React imports
import { useState } from "react";
import { useRef } from "react";

// Component imports
import Form from "./Form";
import Ingredients from "./Ingredients";
import GetRecipe from "./GetRecipe";
import Recipe from "./Recipe";
export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const recipeSectionRef = useRef(null);

  function addIngredient(ingredient) {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  }

  useEffect(() => {
    if (recipeSectionRef.current && recipe) {
      recipeSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  return (
    <main className="main-container">
      <Form addIngredient={addIngredient} />
      {ingredients.length > 0 && (
        <section className="ingredient-section">
          <Ingredients ingredients={ingredients} />
          {ingredients.length > 2 && (
            <GetRecipe
              ingredients={ingredients}
              setRecipe={setRecipe}
              ref={recipeSectionRef}
            />
          )}
        </section>
      )}
      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}
