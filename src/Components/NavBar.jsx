// import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bulma-components";

export default function NavBar() {
  return (
    <>
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item renderAs="div">
            <Link to="/" className={"navbar-item"}>
              <img src="../src/assets/logo.png" alt="WonderChef Logo" />
              <span>WonderChef</span>
            </Link>
          </Navbar.Item>
          <Navbar.Item renderAs="div">
            <Link to="/saved-recipes" className={"navbar-item"}>
              Saved Recipes
            </Link>
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
      </Navbar>
      {/* <nav>
        <ul>
          <li>
            <Link to="/quick-recipes">Quick&Random Recipes</Link>
          </li>
          <li>
            <Link to="/substitute-ingredients">
              Search Substitute Ingredients
            </Link>
          </li>
          <li>
            <Link to="/saved-recipes">Saved Recipes</Link>
          </li>
        </ul>
      </nav> */}
    </>
  );
}
