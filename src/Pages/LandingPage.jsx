// import React from "react";
import SearchBar from "../Components/SearchBar";
import ResultsDisplay from "../Components/ResultsDisplay";
import { useState } from "react";
import Header from "../Components/Header";
import { Block, Progress } from "react-bulma-components";

export default function LandingPage() {
  const [recipes, setRecipes] = useState([]);
  const [fetching, setFetching] = useState(false);

  async function handleSearch(searchParams) {
    // const { query, mealType, cuisine, diet, intolerance } = searchParams;

    setFetching(true);

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?limitLicense=true&apiKey=${
      import.meta.env.VITE_SPOON_API_KEY
    }&query=${searchParams.query}&type=${searchParams.mealType}&cuisine=${
      searchParams.cuisine
    }&diet=${searchParams.diet}&intolerance=${searchParams.intolerances}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      // console.log(data); // check data received //is {results: [*], }

      const fetchedRecipes = data.results;
      // console.log(fetchedRecipes); //[{id: xx, title: xx, image: xx}]

      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setFetching(false);
    }
  }

  if (fetching) {
    return (
      <>
        <Header />
        <Block />
        <div className="content has-text-centered">
          <strong>Whipping up some delicious recipes...</strong>
        </div>
        <Progress className="is-danger" />
      </>
    );
  }

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ResultsDisplay recipes={recipes} />
    </>
  );
}
