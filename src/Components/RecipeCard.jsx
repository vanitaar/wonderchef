import { Card, Heading } from "react-bulma-components";

export default function RecipeCard({ recipe }) {
  return (
    <Card size="4by3">
      <Card.Image src={recipe.image} alt={recipe.title} />
      <Card.Content>
        <Heading size={5}>{recipe.title}</Heading>
      </Card.Content>
    </Card>
  );
}
