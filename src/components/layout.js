/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./layout.css";
import Cookie from "../components/Cookies";


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          logo_image
        }
      }
    }
  `);

  return (
    <>
      {/* <Header siteLogo={data.site.siteMetadata.logo} /> */}
      <header
        className="page_header wrapper"
        style={{
          background: `transparent`,
          marginBottom: `1.45rem`,
        }}
      >
        <Link to="/" className="logo_link">
          <img
            src={data.site.siteMetadata.logo_image}
            className="logo"
            alt="Site Logo"
          />
        </Link>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
      <Cookie />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
