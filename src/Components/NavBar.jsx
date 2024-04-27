// import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bulma-components";
import logo from "./asset/logo.png";

export default function NavBar() {
  return (
    <>
      <Navbar color={"warning"}>
        <Navbar.Brand>
          <Navbar.Item renderAs="div">
            <Link to="/" className={"navbar-item"}>
              <img src={logo} alt="Logo" />
              <span>
                <strong>WonderChef</strong>
              </span>
            </Link>
          </Navbar.Item>
          <Navbar.Item renderAs="div" color="success">
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
