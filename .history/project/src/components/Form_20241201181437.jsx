export default function Form(props) {
  return (
    <form className="add-ingredient-form">
      <div className="form-group">
        <input type="text" placeholder="e.g. oregano" />
        <button type="submit">+ Add Ingredient</button>
      </div>
    </form>
  );
}
