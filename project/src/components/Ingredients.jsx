export default function Ingredients({ ingredients }) {
  let ingredientsHTML = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>;
  });

  return (
    <>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list">{ingredientsHTML}</ul>
    </>
  );
}
