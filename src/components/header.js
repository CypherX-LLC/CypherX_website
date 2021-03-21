import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Nav from "../components/navigation"
import "../scss/header.scss"

const Header = ({ siteTitle }) => (
  <header className="page_header"
    style={{
      background: `transparent`,
      marginBottom: `1.45rem`,
    }}
  >
    <div className = "logo"  >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <Nav />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
