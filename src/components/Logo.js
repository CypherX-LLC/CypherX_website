import React from "react";
import styled from "styled-components";
//import Img from "gatsby-image";
import { Link, useStaticQuery, graphql } from "gatsby";

const LogoWrap = styled.div`
  margin: auto 0;
  flex: 0 1 46px;
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) and (orientation: landscape) {
    flex: 0 1 45px;
  }
`;
const Logo = () => {
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "logo" }, extension: { eq: "png" }) {
        childImageSharp {
          fluid(maxWidth: 50, pngQuality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site(siteMetadata: {}) {
        id
        siteMetadata {
          logo
          logo_image
        }
      }
    }
  `);

  return (
    <LogoWrap as={Link} to="/" className="logo_link">
      {/* <Img fluid={data.file.childImageSharp.fluid} alt="logo" /> */}
      <img
        src={data.site.siteMetadata.logo_image}
        alt="Site logo"
        className="logo"
      />
      {/* <span>{data.site.siteMetadata.logo}</span> */}
    </LogoWrap>
  );
};

export default Logo;
