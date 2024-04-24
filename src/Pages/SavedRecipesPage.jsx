import { useContext } from "react";
import { AirtableContext } from "../AirtableContext";
import { Container, Content, Heading, Section } from "react-bulma-components";

export default function SavedRecipesPage() {
  const { savedRecipes } = useContext(AirtableContext);

  return (
    <Container>
      {/* if no recipe found */}
      {savedRecipes.length !== 0 ? (
        <Content>
          {savedRecipes.map((recipe) => (
            <Section key={recipe.fields.MyRecipeID}>
              <h5>{recipe.fields.TItle}</h5>
              <img src={recipe.fields.ImgSrc} alt={recipe.fields.TItle} />
            </Section>
          ))}
        </Content>
      ) : (
        <Heading subtitle>Find your bookmarked recipes here!</Heading>
      )}
    </Container>
  );
}
