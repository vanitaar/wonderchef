import { useState } from "react";
import { Form } from "react-bulma-components";

const { Input, Field, Control, Select } = Form;

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerance, setIntolerance] = useState("");

  //use function passed in prop
  const handleSearch = () => {
    const searchParams = {
      query,
      mealType,
      cuisine,
      diet,
      intolerance,
    };
    onSearch(searchParams);
  };
  console.log(query);
  return (
    <>
      <br />
      <Field align="centre" kind="addons">
        <Control>
          <Input
            className="input is-rounded"
            type="text"
            placeholder="Search recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Control>
        <Control>
          <button className="button is-dark is-rounded" onClick={handleSearch}>
            Search
          </button>
        </Control>
      </Field>
      <Field align="left" kind="group">
        <Select
          size="small"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="">Meal Type</option>
          <option value="main course">Main Course</option>
          <option value="dessert">Dessert</option>
        </Select>
        <Select
          size="small"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">Cuisine</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
        </Select>
        <Select
          size="small"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="">Diet</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
        </Select>
        <Select
          size="small"
          value={intolerance}
          onChange={(e) => setIntolerance(e.target.value)}
        >
          <option value="">Intolerance</option>
          <option value="dairy">Dairy</option>
          <option value="gluten">Gluten</option>
        </Select>
      </Field>
    </>
  );
}
