  
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <div className="navbar-container fixed-top">
      <nav className="navbar navbar-expand-md navbar-light">
          <h5 className="logo">Google Book Search</h5>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link scroll" to="/">Search<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link scroll" to="/saved">Saved</Link>
              </li>
              </ul>
          </div>
      </nav>
    </div>
  );
}

export default Nav;