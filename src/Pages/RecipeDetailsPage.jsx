import { useParams } from "react-router-dom";

export default function RecipeDetailsPage() {
  const { id } = useParams();

  return <>RecipeDetailsPage {id}</>;
}
