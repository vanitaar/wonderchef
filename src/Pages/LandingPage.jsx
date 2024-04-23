// import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
import ResultsDisplay from "../Components/ResultsDisplay";
import { useState } from "react";

export default function LandingPage() {
  const [recipes, setRecipes] = useState([]);

  async function handleSearch(searchParams) {
    const { query, mealType, cuisine, diet, intolerance } = searchParams;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
      import.meta.env.VITE_SPOON_API_KEY
    }&query=${query}&type=${mealType}&cuisine=${cuisine}&diet=${diet}&intolerance=${intolerance}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      console.log(data); // check data received //is {results: [*], }

      const fetchedRecipes = data.results;
      console.log(fetchedRecipes); //[{id: xx, title: xx, image: xx}]

      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }

  return (
    <>
      <NavBar />
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ResultsDisplay recipes={recipes} />
      <Footer />
    </>
  );
}
