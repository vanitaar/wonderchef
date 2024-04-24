import RecipeCard from "./RecipeCard";
import { Container, Columns, Heading } from "react-bulma-components";

export default function ResultsDisplay({ recipes }) {
  return (
    <Container>
      {/* if no recipe found */}
      {recipes.length >= 1 ? (
        <Heading subtitle>
          Looks like we &apos;re fresh out of recipes here!
        </Heading>
      ) : (
        <Columns multiline={true}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Columns>
      )}
    </Container>
  );
}
