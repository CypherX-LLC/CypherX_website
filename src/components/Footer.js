import React from "react";
import { Link } from "gatsby";
import Navigation from "../data/navigation_footer.yml";

const Footer = () => {
  const Nav = () => {
    const Items = Navigation.map((item, key) => {
      return (
          <Link to={item.link} className="menuItem_footer" key={key}>
            {item.title}
          </Link>
      );
    });
    return <div className="bottom_nav">{Items}</div>;
  };
  return (
    <footer className="page_footer">
      <div className="wrapper footer_grid">
        <img
          src="/images/imgbin_graphics-website-wireframe-wire-frame-model-globe-sphere-png 2.png"
          alt="featured"
        />
        <div className="col_2">
          <Nav />
          <p className="copyright">© 2021 CypherX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
