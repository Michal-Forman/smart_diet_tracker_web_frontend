// Library imports
import { NavLink } from "react-router-dom";

function menu({ isOpen }: any) {
  return (
    <div className={`menu--container ${isOpen ? "open" : ""}`}>
      <div id="menu--home-container">
        <NavLink className="menu--link" to="/">
          <h3>Home</h3>
        </NavLink>
      </div>
      <div id="menu--food-container">
        <NavLink className="menu--link" to="/food">
          <h3>Food</h3>
        </NavLink>
      </div>
    </div>
  );
}

export default menu;
