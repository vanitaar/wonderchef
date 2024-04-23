// import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import RecipeDetailsPage from "./Pages/RecipeDetailsPage";
import SavedRecipesPage from "./Pages/SavedRecipesPage";

// async function logRecipes() {
//   try {
//     const res = await fetch(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
//         import.meta.env.VITE_SPOON_API_KEY
//       }`
//     );

//     if (!res.ok) {
//       throw new Error("Network response was not OK");
//     }

//     const recipes = await res.json();
//     console.log(recipes);
//   } catch (error) {
//     console.error("There has been a problem with your fetch operation:", error);
//   }
// }

function App() {
  // logRecipes();

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
      </Routes>
    </>
  );
}

export default App;
