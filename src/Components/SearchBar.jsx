import { useState } from "react";
import { Section, Form, Media } from "react-bulma-components";
import { useSearchParams } from "react-router-dom";
const { Input, Field, Control, Select } = Form;

export default function SearchBar({ onSearch }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");

  //use function passed in prop
  const handleSearch = () => {
    const searchParams = {
      query,
      mealType,
      cuisine,
      diet,
      intolerances,
    };
    onSearch(searchParams);
  };
  console.log(query);
  return (
    <>
      <br />
      <Section>
        <Media>
          <Media.Item align="center">
            <Field align="center" kind="addons">
              <Control>
                <Input
                  className="input is-rounded"
                  type="search"
                  placeholder="Search recipes"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Control>
              <Control>
                <button
                  className="button is-danger is-rounded"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </Control>
            </Field>
          </Media.Item>
        </Media>
        <Media>
          <Field align="center" kind="group">
            <Select
              size="small"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">Meal Type</option>
              <option value="appetizer">Appetizer</option>
              <option value="main course">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="beverage">Beverage</option>
              <option value="snack">Snack</option>
            </Select>
            <Select
              size="small"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="">Cuisine</option>
              <option value="chinese">Chinese</option>
              <option value="greek">Greek</option>
              <option value="indian">Indian</option>
              <option value="italian">Italian</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="mexican">Mexican</option>
              <option value="thai">Thai</option>
            </Select>
            <Select
              size="small"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="">Diet</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="paleo">Paleo</option>
              <option value="pescetarian">Pescetarian</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
            </Select>
            <Select
              size="small"
              value={intolerances}
              onChange={(e) => setIntolerances(e.target.value)}
            >
              <option value="">Intolerance</option>
              <option value="dairy">Dairy</option>
              <option value="egg">Egg</option>
              <option value="gluten">Gluten</option>
              <option value="grain">Grain</option>
              <option value="peanut">Peanut</option>
              <option value="shellfish">Shellfish</option>
              <option value="seasame">Seasame</option>
              <option value="seafood">Seafood</option>
              <option value="soy">Soy</option>
            </Select>
          </Field>
        </Media>
      </Section>
    </>
  );
}
