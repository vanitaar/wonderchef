import { useState } from "react";
import { Section, Form, Media } from "react-bulma-components";
import { useSearchParams } from "react-router-dom";
const { Input, Field, Control, Select } = Form;

export default function SearchBar({ onSearch }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState({
    query: searchParams.get("query") || "",
    mealType: searchParams.get("mealType") || "",
    cuisine: searchParams.get("cuisine") || "",
    diet: searchParams.get("diet") || "",
    intolerances: searchParams.get("intolerances") || "",
  });

  //query in input function --> onChange to take in target + searchData
  const handleChange = (e) => {
    const { name, value } = e.target; //obj destructuring to access input //prev was inline
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //use function passed in prop
  const handleSearch = (e) => {
    e.preventDefault(); //prevent page reload
    //remove empty string values from searchData //obj --> array --> filter --> obj
    const refinedParams = Object.fromEntries(
      Object.entries(searchData).filter(([_, value]) => value !== "") // eslint-disable-line no-unused-vars
    );
    console.log(refinedParams);
    setSearchParams(refinedParams); //so  url will be without empty params
    onSearch(searchData); //arg cannot be searchParams--> holds URL search parameters -->logs {size:5}
  };
  // console.log(searchData.query);
  // console.log(searchParams);
  return (
    <>
      <br />
      <Section>
        <Media>
          <Media.Item align="center">
            <form onSubmit={handleSearch}>
              <Field align="center" kind="addons">
                <Control>
                  <Input
                    className="input is-rounded"
                    type="search"
                    placeholder="Search recipes"
                    name="query"
                    value={searchData.query}
                    onChange={handleChange}
                  />
                </Control>
                <Control>
                  <button className="button is-danger is-rounded" type="submit">
                    Search
                  </button>
                </Control>
              </Field>
            </form>
          </Media.Item>
        </Media>
        <Media>
          <Field align="center" kind="group">
            <Select
              size="small"
              name="mealType"
              value={searchData.mealType}
              onChange={handleChange}
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
              name="cuisine"
              value={searchData.cuisine}
              onChange={handleChange}
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
              name="diet"
              value={searchData.diet}
              onChange={handleChange}
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
              name="intolerances"
              value={searchData.intolerances}
              onChange={handleChange}
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
