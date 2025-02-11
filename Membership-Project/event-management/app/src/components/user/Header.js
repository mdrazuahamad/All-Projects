import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-info text-white">
        <Link className="navbar-brand" to="/">
        চন্দনাইশ সমিতি-ঢাকা
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link className="nav-item nav-link text-white" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link text-white" to="/events">
              Events
            </Link>
            <Link className="nav-item nav-link text-white" to="/login">
              Login
            </Link>
            <Link className="nav-item nav-link text-white" to="/register">
              Register
            </Link>
          </div>
        </div>
        <div></div>
      </nav>
    </div>
  );
};

export default Header;
