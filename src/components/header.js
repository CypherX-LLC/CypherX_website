import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Nav from "../components/navigation";
import "../scss/pages_style.scss";

const Header = ({ siteLogo }) => (
  <header
    className="page_header wrapper"
    style={{
      background: `transparent`,
      marginBottom: `1.45rem`,
    }}
  >
    <Link
      to="/"
      className= "logo_link"
    >
      <img src={siteLogo} className="logo" alt="Site Logo" />
    </Link>
    <Nav />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
