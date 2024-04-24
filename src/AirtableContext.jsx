import { createContext, useEffect, useState } from "react";
import Airtable from "airtable";

//initialize airtable with my API key and base ID
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base("appqsD3wc5xZBbGMa");

//creating context for useContext later
export const AirtableContext = createContext();

//using children prop to access nested components --> wrapped by this Component
export default function AirtableContextProvider({ children }) {
  const [records, setRecords] = useState([]); //initialize as empty array ?null

  //fetch records (copied select...) from airtable when component mounts --> empty dependency array //useEffect(() => {}, [])
  useEffect(() => {
    base("MySavedRecipes")
      .select({
        view: "Grid view",
      })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        setRecords(records); //assign to state
        records.forEach(function (record) {
          console.log("Retrieved", record.get("MyRecipeID"));
        });
      });
  }, []);

  return (
    <AirtableContext.Provider value={{ records }}>
      {children}
    </AirtableContext.Provider>
  );
}
