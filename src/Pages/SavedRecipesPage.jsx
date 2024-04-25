import { useContext } from "react";
import { AirtableContext } from "../AirtableContext";
import { Container, Content, Heading, Section } from "react-bulma-components";
import { Link } from "react-router-dom";

export default function SavedRecipesPage() {
  const { savedRecipes } = useContext(AirtableContext);
  //need to then display in this children component--> use map to iterate thru airtable data

  //   const navigate = useNavigate();

  //   //using Callback to prevent onClick to be called on rendering
  //   const navigateToDetails = useCallback(
  //     (id) => {
  //       navigate(`/recipe/${id}`);
  //     },
  //     [navigate]
  //   );

  //   function navigateToDetails(id) {
  //     // navigate(`/recipe/${id}`); -->error
  //     window.location.href = `/recipe/${id}`;
  //   }

  return (
    <Container>
      {/* if no recipe found */}
      {savedRecipes.length !== 0 ? (
        <Content>
          {savedRecipes.map((recipe, index) => (
            <Section key={index}>
              <h5>{recipe.fields.TItle}</h5>
              <img src={recipe.fields.ImgSrc} alt={recipe.fields.TItle} />
              {/* <Button onClick={navigateToDetails(recipe.fields.apiID)}>
                See recipe details
              </Button> */}
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
