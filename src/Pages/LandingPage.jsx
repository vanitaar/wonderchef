// import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";
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
      const fetchedRecipes = await response.json();
      console.log(fetchedRecipes); // check data received
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }

  return (
    <>
      <NavBar />
      <Header />
      <SearchBar onSearch={handleSearch} />
      <Footer />
    </>
  );
}
