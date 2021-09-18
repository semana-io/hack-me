import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () : JSX.Element => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Semana</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/employees">
            Employees
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/desks">
            Desks
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/assignment">
            Assignment
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
