import { useContext } from "react";
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
  const { savedRecipes, delRecipe } = useContext(AirtableContext);

  //delete button --> delRecipe

  function clickDelete(recordId) {
    console.log("check delete button");
    delRecipe(recordId); //hardcoded works //but immediate ? never click still works// need to check
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
              <Button onClick={() => clickDelete("rec5EEuXhJpr3awe4")} remove />
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
