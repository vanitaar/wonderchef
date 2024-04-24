// import React from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import RecipeDetailsPage from "./Pages/RecipeDetailsPage";
import SavedRecipesPage from "./Pages/SavedRecipesPage";

function App() {
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
