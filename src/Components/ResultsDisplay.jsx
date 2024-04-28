import RecipeCard from "./RecipeCard";
import { Container, Columns, Heading, Section } from "react-bulma-components";

export default function ResultsDisplay({ recipes }) {
  if (recipes.length === 0) {
    return (
      <Section>
        <Heading subtitle textColor="success">
          <i>
            Looks like we&apos;re fresh out of recipes here! Search and explore!
          </i>
        </Heading>
      </Section>
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
