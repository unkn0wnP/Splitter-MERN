import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const handlelogout = () => {
    localStorage.removeItem("splitterToken");
    window.location.href = "/";
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#4bccaa"}}>
        <div className="container-fluid">
          <Link to="/dashboard" className="navbar-brand mx-5">
            <img
              src={require("../images/home.png")}
              alt=""
              width="30"
              height="24"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse fw-bold" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              
              <li className="nav-item dropdown mx-5">
                <a
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {props.username}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handlelogout}>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
