import "./App.css";

async function logRecipes() {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_SPOON_API_KEY
      }`
    );

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const recipes = await res.json();
    console.log(recipes);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function App() {
  logRecipes();

  return (
    <>
      <h1>WonderChef</h1>
    </>
  );
}

export default App;
