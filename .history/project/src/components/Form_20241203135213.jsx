export default function Form(props) {
  function addNewIngredient(formData) {
    const ingredient = formData.get("ingredient");
    props.addIngredient(ingredient);
  }

  return (
    <form action={addNewIngredient} className="add-ingredient-form">
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
