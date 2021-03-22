import React from "react";
import { Link } from "gatsby";
import Navigation from "../data/navigation_footer.yml";

const Footer = () => {
  const Nav = () => {
    const Items = Navigation.map((item, key) => {
      return (
          <Link to={item.link} className="menuItem" key={key}>
            {item.title}
          </Link>
      );
    });
    return <div className="bottom_nav wrapper">{Items}</div>;
  };
  return (
    <footer className="page_footer">
      <div className="wrapper footer_grid">
          <img src="/images/triangular1.png" alt="triangular" />
        <div className="col_2">
          <Nav />
          <p className="copyright">© 2021 CypherX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;