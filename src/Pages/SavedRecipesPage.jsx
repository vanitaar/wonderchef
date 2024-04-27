import { useContext, useEffect } from "react";
import { AirtableContext } from "../AirtableContext";
import {
  Container,
  Content,
  Heading,
  Image,
  Button,
  Media,
} from "react-bulma-components";
import { Link } from "react-router-dom";

export default function SavedRecipesPage() {
  const { savedRecipes, delRecipe, setSavedRecipes, apiUrl, loading } =
    useContext(AirtableContext);

  useEffect(() => {
    async function fetchDataAfterDelete() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          },
        });
        const data = await response.json();
        setSavedRecipes(data.records);
      } catch (error) {
        console.error("Error fetching data after delete:", error);
      }
    }

    fetchDataAfterDelete();
  }, [delRecipe, setSavedRecipes, apiUrl]);

  //delete button --> delRecipe
  function clickDelete(recordId) {
    delRecipe(recordId); //hardcoded works //but immediate ? never click still works// need to check
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  /* if no recipe found */
  if (savedRecipes.length === 0) {
    return <Heading subtitle>Find your bookmarked recipes here!</Heading>;
  }

  return (
    <Container>
      <Content>
        {savedRecipes.map((recipe, index) => (
          <Media key={index}>
            <Media.Item align="left">
              <Image
                src={recipe?.fields?.ImgSrc}
                alt={recipe?.fields?.TItle}
                size={230}
                rounded={true}
              />
            </Media.Item>
            <Media.Item align="center">
              <Content>
                <h5>{recipe?.fields?.TItle}</h5>
                <br />
                <small>
                  <Link to={`/recipe/${recipe?.fields?.apiID}`}>
                    See Recipe Details
                  </Link>
                </small>
              </Content>
            </Media.Item>
            <Media.Item align="right">
              <Button
                onClick={() => clickDelete(recipe?.fields?.recordID)}
                remove
              />
            </Media.Item>
          </Media>
        ))}
      </Content>
    </Container>
  );
}
