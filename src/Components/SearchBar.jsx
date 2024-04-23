import { useState } from "react";
import { Form } from "react-bulma-components";

const { Input, Field, Control, Label } = Form;

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
      <Field align="center" kind="group">
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="">Meal Type</option>
          <option value="main course">Main Course</option>
          <option value="dessert">Dessert</option>
        </select>
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Select Cuisine</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
        </select>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Select Diet</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
        <select
          value={intolerance}
          onChange={(e) => setIntolerance(e.target.value)}
        >
          <option value="">Select Intolerance</option>
          <option value="dairy">Dairy</option>
          <option value="gluten">Gluten</option>
        </select>
      </Field>
    </>
  );
}
