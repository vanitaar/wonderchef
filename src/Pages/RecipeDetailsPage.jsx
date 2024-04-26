import { useState, useEffect, useContext } from "react";
import { Button, Content, Panel } from "react-bulma-components";
import { useParams } from "react-router-dom";
import { AirtableContext } from "../AirtableContext";
import { FaCheckCircle } from "react-icons/fa";

//fetch data from recipeInfo url using id param
export default function RecipeDetailsPage() {
  const { id } = useParams();
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
    import.meta.env.VITE_SPOON_API_KEY
  }&addWinePairing=false&addTasteData=false`;

  const {
    addRecipeToAirtable,
    savedRecipes,
    setSavedRecipes,
    isBookmarked,
    setIsBookmarked,
  } = useContext(AirtableContext);

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
          //checking  if  already bookmarked //some method to see if at least one meets condition//.some(() => cond)
          if (savedRecipes.some((recipe) => recipe.apiID === data.id)) {
            setIsBookmarked(true);
          }
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    fetchRecipeDetails();

    return () => {
      active = false;
    };
  }, [apiUrl, id, savedRecipes, setIsBookmarked]);

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
    addRecipeToAirtable(recipeData); //POST --> asyn fn = call API, doesnt wait for response before moving on with next lin of code
    setIsBookmarked(true); //onClick set state immediately to update user process started// in addToAirtabl fn same line is if successfully added also set to true
    setSavedRecipes((prevSavedRecipes) => [...prevSavedRecipes, recipeData]); //to update ased on prev --> most updated --> *functional update, trying to prevent stale data/race cond
    console.log("boookmarked successfully");
  }

  //delete button --> deleteFromAirtable

  return (
    <>
      {/* RecipeDetailsPage {id} */}
      <Panel>
        <Panel.Header>{recipeDetails.title}</Panel.Header>
        <Panel.Block>
          <img size="2by1" src={recipeDetails.image} />
          <Button onClick={clickBookmark} disabled={isBookmarked === true}>
            {isBookmarked ? (
              <>
                Bookmarked{" "}
                <FaCheckCircle style={{ color: "rgb(255, 255, 0)" }} />
              </>
            ) : (
              "Bookmark"
            )}
          </Button>
        </Panel.Block>
        <Panel.Block>
          <Panel.Tabs>
            <Panel.Tabs.Tab active>Instructions</Panel.Tabs.Tab>
            <Panel.Tabs.Tab>Ingredients</Panel.Tabs.Tab>
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
        <Panel.Block>
          {recipeDetails?.extendedIngredients?.map((ingredient, index) => (
            <Content key={index}>
              <ul>
                <li key={index}>{ingredient.original}</li>
              </ul>
            </Content>
          ))}
        </Panel.Block>
      </Panel>
    </>
  );
}
