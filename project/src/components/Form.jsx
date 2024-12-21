export default function Form(props) {
  function onAddIngredient(event) {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const ingredient = input.value;
    if (!ingredient) return;
    input.value = "";
    props.addIngredient(ingredient);
  }

  return (
    <form onSubmit={onAddIngredient} className="add-ingredient-form">
      <div className="form-group">
        <input
          type="text"
          name="ingredient"
          id="ingredient"
          placeholder="e.g. oregano"
        />
        <button type="submit">+ Add Ingredient</button>
      </div>
    </form>
  );
}
