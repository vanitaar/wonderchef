import { createContext, useEffect, useState } from "react";

//creating context for useContext later
export const AirtableContext = createContext();

//using children prop to access nested components --> wrapped by this Component
export default function AirtableContextProvider({ children }) {
  const [savedRecipes, setSavedRecipes] = useState([]); //initialize as empty array ?null
  const apiUrl =
    "https://api.airtable.com/v0/appqsD3wc5xZBbGMa/MySavedRecipes?view=Grid%20view";

  //fetch records from airtable when component mounts --> empty dependency array //useEffect(() => {}, [])
  useEffect(() => {
    let active = true;

    async function fetchSavedRecipes() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data.records);
        if (active) {
          setSavedRecipes(data.records);
        } // airtable returns obj--> {records: [{fields: {header: data}}]}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchSavedRecipes();

    //cleanup fn
    return () => {
      active = false;
    };
  }, []);

  //POST //recipeData = {header: data, }
  async function addRecipeToAirtable(recipeData) {
    try {
      const response = await fetch(
        "https://api.airtable.com/v0/appqsD3wc5xZBbGMa/MySavedRecipes",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: recipeData,
                // fields: {
                //   ImgSrc: recipeDetails.image,
                //   apiID: recipeDetails.id,
                //   TItle: recipeDetails.title,
                // },
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recipe to Airtable");
      }

      console.log("Recipe added to Airtable successfully");
    } catch (error) {
      console.error("Error adding recipe to Airtable:", error);
    }
  }

  return (
    <AirtableContext.Provider
      value={{ savedRecipes, setSavedRecipes, addRecipeToAirtable }}
    >
      {children}
    </AirtableContext.Provider>
  );
}
