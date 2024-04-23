import RecipeCard from "./RecipeCard";
import { Container, Columns } from "react-bulma-components";

export default function ResultsDisplay({ recipes }) {
  return (
    <Container>
      <Columns multiline={true}>
        {recipes.map((recipe) => (
          <Columns.Column narrow size={4} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Columns.Column>
        ))}
      </Columns>
    </Container>
  );
}
