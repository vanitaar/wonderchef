// import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
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
    </nav>
  );
}
