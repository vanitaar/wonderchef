import { useContext, useEffect } from "react";
import { AirtableContext } from "../AirtableContext";
import {
  Container,
  Content,
  Heading,
  Section,
  Button,
} from "react-bulma-components";
import { Link } from "react-router-dom";

export default function SavedRecipesPage() {
  const { savedRecipes, delRecipe, setSavedRecipes, apiUrl } =
    useContext(AirtableContext);

  useEffect(() => {
    async function fetchDataAfterDelete() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          },
        });
        const data = await response.json();
        setSavedRecipes(data.records);
      } catch (error) {
        console.error("Error fetching data after delete:", error);
      }
    }

    fetchDataAfterDelete();
  }, [delRecipe, setSavedRecipes, apiUrl]);

  //delete button --> delRecipe
  function clickDelete(recordId) {
    // console.log("check delete button");
    delRecipe(recordId); //hardcoded works //but immediate ? never click still works// need to check
    // //update state by filtering out
    // setSavedRecipes((prevRecipes) =>
    //   prevRecipes.filter((recipe) => recipe.recordID !== recordId)
    // );
  }

  return (
    <Container>
      {/* if no recipe found */}
      {savedRecipes.length !== 0 ? (
        <Content>
          {savedRecipes.map((recipe, index) => (
            <Section key={index}>
              <h5>{recipe.fields.TItle}</h5>
              <img src={recipe.fields.ImgSrc} alt={recipe.fields.TItle} />
              {/* delete button yet to work*/}
              <Button
                onClick={() => clickDelete(recipe.fields.recordID)}
                remove
              />
              <Link to={`/recipe/${recipe.fields.apiID}`}>
                See Recipe Details
              </Link>
            </Section>
          ))}
        </Content>
      ) : (
        <Heading subtitle>Find your bookmarked recipes here!</Heading>
      )}
    </Container>
  );
}
