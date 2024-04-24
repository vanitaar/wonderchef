import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//fetch data from recipeInfo url using id param
export default function RecipeDetailsPage() {
  const { id } = useParams();
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
    import.meta.env.VITE_SPOON_API_KEY
  }&addWinePairing=false&addTasteData=false`;
  const [recipeDetails, setRecipeDetails] = useState(null); //initialize as null
  //useEffect(() => {},[id]) to fetch data based on id -->dependency array
  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log(data); // check data received //is {id:*, image:*, servings:*, title:*, analyzedInstrctions: [{steps: [{number:1, step: xxx}]}], }

        // const fetchedRecipes = data.results;
        // console.log(fetchedRecipes); //[{id: xx, title: xx, image: xx}]

        setRecipeDetails(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchRecipeDetails();
  }, [apiUrl, id]);

  return <>RecipeDetailsPage {id}</>;
}
