import RecipeCard from "./RecipeCard";
import { Container, Columns, Heading } from "react-bulma-components";

export default function ResultsDisplay({ recipes }) {
  {
    /* if no recipe found */
  }
  if (recipes.length === 0) {
    return (
      <Heading subtitle>
        Looks like we &apos;re fresh out of recipes here!
      </Heading>
    );
  }

  return (
    <Container>
      <Columns multiline={true}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Columns>
    </Container>
  );
}
