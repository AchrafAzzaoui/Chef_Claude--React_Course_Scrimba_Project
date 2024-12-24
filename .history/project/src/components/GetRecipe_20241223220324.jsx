import { useState } from "react";

export default function GetRecipe({ ingredients, setRecipe, ref }) {
  const [recipeLoading, setRecipeLoading] = useState(false);

  async function getClaudeRecipe(event) {
    event.preventDefault();
    setRecipeLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    };
    try {
      const response = await fetch(
        "https://chef-claude-recipe-generator.onrender.com/api/generateRecipe",
        requestOptions
      );
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setRecipeLoading(false);
    }
  }
  return (
    <div className="get-recipe-container">
      <div className="get-recipe-instructions" ref={ref}>
        <h3>Ready for a recipe?</h3>
        <p>Generate a recipe from your list of ingredients.</p>
      </div>
      <button
        className="get-recipe-button"
        onClick={getClaudeRecipe}
        disabled={recipeLoading}
      >
        {recipeLoading ? "Generating..." : "Get a recipe"}
      </button>
    </div>
  );
}
