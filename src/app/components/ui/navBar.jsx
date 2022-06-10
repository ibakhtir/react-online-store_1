import React from "react";
import { Link } from "react-router-dom";

import {
  MAIN_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOPPING_CART_ROUTE
} from "../../utils/constants";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={MAIN_ROUTE} className="navbar-brand text-warning mb-0 h1">
          PIZZA
        </Link>
        <div className="d-flex">
          <Link
            to={ADMIN_ROUTE}
            role="button"
            className="btn btn-warning me-2 btn-sm"
          >
            <i className="bi bi-gear"></i>
          </Link>
          <Link
            to={LOGIN_ROUTE}
            role="button"
            className="btn btn-warning me-2 btn-sm"
          >
            <i className="bi bi-person"></i>
          </Link>
          <Link
            to={SHOPPING_CART_ROUTE}
            role="button"
            className="btn btn-warning btn-sm"
          >
            <i className="bi bi-cart"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
