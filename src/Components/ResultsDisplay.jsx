import RecipeCard from "./RecipeCard";
import { Container, Columns } from "react-bulma-components";

export default function ResultsDisplay({ recipes }) {
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
