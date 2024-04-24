import { useState, useEffect } from "react";
import { Block, Panel } from "react-bulma-components";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Header from "../Components/Header";

//fetch data from recipeInfo url using id param
export default function RecipeDetailsPage() {
  const { id } = useParams();
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
    import.meta.env.VITE_SPOON_API_KEY
  }&addWinePairing=false&addTasteData=false`;
  const [recipeDetails, setRecipeDetails] = useState({}); //initialize as empty obj (not null)
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

        setRecipeDetails(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchRecipeDetails();
  }, [apiUrl, id]);

  return (
    <>
      <NavBar />
      <Header />
      <Block />
      {/* RecipeDetailsPage {id} */}
      <Panel>
        <Panel.Header>{recipeDetails.title}</Panel.Header>
        <Panel.Block>
          <img size="2by1" src={recipeDetails.image} />
          {/* <p>details</p> */}
          <h3>Instructions:</h3>
          {recipeDetails.analyzedInstructions &&
          recipeDetails.analyzedInstructions.length > 0 ? (
            recipeDetails.analyzedInstructions.map((instruction, index) => (
              <div key={index}>
                <h4>Step {index + 1}</h4>
                <ul>
                  {instruction.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step.step}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Fetching details</p>
          )}
        </Panel.Block>
      </Panel>
    </>
  );
}
