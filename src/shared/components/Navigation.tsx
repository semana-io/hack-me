import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => (
    <div className="Navigation">
      <p>Hack Me</p>
      <ul>
        <li>
          <NavLink to="/desks">Desks | </NavLink>
        </li>
        <li>
          <NavLink to="/employees">Employees</NavLink>
        </li>
      </ul>
    </div>
);

export default Navigation;