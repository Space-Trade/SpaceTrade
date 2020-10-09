import React, {useState} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Home({name, url, url2, name2}) {
    const userId = localStorage.getItem('userId') != null;

  return (
    <nav className="header">
      <div className="header__logo">
        <h3>Space Trade jaja xD</h3>
        <span className="header__line" />
        <h6>ah ok</h6>
      </div>
      {userId == "" ? (
        <ul className="header__menu">
          <Link to={url}>
            <li>
              <button type="submit" className="header__button-login">
                {name}
              </button>
            </li>
          </Link>
          <Link to={url2}>
            <li>
              <button type="submit" className="header__button-register">
                {name2}
              </button>
            </li>
          </Link>
        </ul>
      ) : (
        <Link to="/dashboard">
          <button type="submit" className="header__button-register">
            DASHBOARD
          </button>
        </Link>
      )}
    </nav>
  );
}
Home.propTypes = {
  url: PropTypes.string,
  url2: PropTypes.string,
  name: PropTypes.string,
  name2: PropTypes.string,
};

export default Home;