import { Card, Heading, Columns } from "react-bulma-components";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Columns.Column narrow size={4}>
      <Link to={`/recipe/${recipe.id}`}>
        <Card>
          <Card.Image src={recipe.image} alt={recipe.title} />
          <Card.Content>
            <Heading size={5}>{recipe.title}</Heading>
          </Card.Content>
        </Card>
      </Link>
    </Columns.Column>
  );
}
