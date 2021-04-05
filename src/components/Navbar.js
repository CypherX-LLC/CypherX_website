import React, { useState } from "react";
import styled from "styled-components";
//import NavbarLinks from "./NavbarLinks";
//import Logo from "./Logo";
import { Link } from "gatsby";
import Navigate from "../data/navigation.yml";

const NavItem = styled(Link)`
  text-decoration: none;
  color: #000;
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  transition: all 200ms ease-in;
  position: relative;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: goldenrod;
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: goldenrod;
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.2rem;
    z-index: 6;
  }
`;

const Navigation = styled.nav`
 /*  position: sticky;
  top: 0; */
  height: 12vh;
  max-width: 1440px;
  display: flex;
  background-color: transparent;
  justify-content: space-between;
  //text-transform: uppercase;
  //border-bottom: 2px solid #33333320;
  //margin: 0 auto;
  padding: 0 10px;
  z-index: 2;
  align-self: center;
  justify-self: end;

  @media (max-width: 768px) {
   /*  position: sticky; */
    height: 8vh;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
  }
`;

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;
  padding: 0 10vw;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Navbox = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    width: 100%;
    justify-content: flex-start;
    padding-top: 20px;
    transition: all 0.3s ease-in;
    top: 8vh;
    left: ${(props) => (props.open ? "-100%" : "0")};
  }
`;

const Hamburger = styled.div`
  background-color: #000;
  width: 30px;
  height: 3px;
  transition: all 0.3s linear;
  align-self: center;
  position: relative;
  transform: ${(props) => (props.open ? "rotate(-45deg)" : "inherit")};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: #000;
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${(props) =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${(props) => (props.open ? "0" : "1")};
    transform: ${(props) => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 10px;
  }
`;
const NavbarLinks = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const Items = Navigate.map((item, key) => {
    return (
      <div className="menuItem" key={key}>
        <NavItem
          to={item.link}
          onClick={() => {
            setNavbarOpen(!navbarOpen);
            console.log(navbarOpen);
          }}
        >
          {item.title}
        </NavItem>
      </div>
    );
  });
  return <>{Items}</>;
};

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <Navigation>
      {/* <Logo /> */}
      <Toggle
        navbarOpen={navbarOpen}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {navbarOpen ? <Hamburger open /> : <Hamburger />}
      </Toggle>
      {navbarOpen ? (
        <Navbox className="menuItemsMobile">
          <NavbarLinks />
        </Navbox>
      ) : (
        <Navbox open className="menuItems">
          <NavbarLinks />
        </Navbox>
      )}
    </Navigation>
  );
};

export default Navbar;
