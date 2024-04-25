import { useState, useEffect, useContext } from "react";
import { Button, Panel } from "react-bulma-components";
import { useParams } from "react-router-dom";
import { AirtableContext } from "../AirtableContext";

//fetch data from recipeInfo url using id param
export default function RecipeDetailsPage() {
  const { id } = useParams();
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
    import.meta.env.VITE_SPOON_API_KEY
  }&addWinePairing=false&addTasteData=false`;

  const { addRecipeToAirtable, savedRecipes, setSavedRecipes } =
    useContext(AirtableContext);

  const [recipeDetails, setRecipeDetails] = useState({}); //initialize as empty obj (not null)

  //useEffect(() => {},[id]) to fetch data based on id -->dependency array
  //adding cleanup to useEffect (console.log x10)
  useEffect(() => {
    let active = true; //setup boolean for cleanup fn

    async function fetchRecipeDetails() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        console.log(data); // check data received //is {id:*, image:*, servings:*, title:*, analyzedInstrctions: [{steps: [{number:1, step: xxx}]}], }
        if (active) {
          setRecipeDetails(data);
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchRecipeDetails();

    return () => {
      active = false;
    };
  }, [apiUrl, id]);

  //refactoring data to be able to suit to airtable fields format//return an obj --> {header:data}//based on POST body
  function detailsToAirtable(recipeDetails) {
    return {
      ImgSrc: recipeDetails.image,
      apiID: recipeDetails.id?.toString(),
      TItle: recipeDetails.title,
    };
  }
  console.log(detailsToAirtable(recipeDetails));

  //bookmark button --> addRecipeToAirtable
  function clickBookmark() {
    const recipeData = detailsToAirtable(recipeDetails);
    addRecipeToAirtable(recipeData);
  }

  return (
    <>
      {/* RecipeDetailsPage {id} */}
      <Panel>
        <Panel.Header>{recipeDetails.title}</Panel.Header>
        <Panel.Block>
          <img size="2by1" src={recipeDetails.image} />
          <Button onClick={clickBookmark}>Bookmark</Button>
        </Panel.Block>
        <Panel.Block>
          <Panel.Tabs>
            <Panel.Tabs.Tab active>Instructions</Panel.Tabs.Tab>
          </Panel.Tabs>
        </Panel.Block>
        <Panel.Block>
          {recipeDetails.analyzedInstructions &&
          recipeDetails.analyzedInstructions.length > 0 ? (
            recipeDetails.analyzedInstructions.map((instruction, index) => (
              <Panel.Block key={index}>
                <ol>
                  {instruction.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step.step}</li>
                  ))}
                </ol>
              </Panel.Block>
            ))
          ) : (
            <p>Fetching details</p>
          )}
        </Panel.Block>
      </Panel>
    </>
  );
}
