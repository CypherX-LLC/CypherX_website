import React from "react";
import Seo from "./Seo";

const MdxHead = ({ pageContext, location }) => {
  const frontmatter = pageContext?.frontmatter || {};
  const canonical = `https://cypherx.tech${location.pathname}`;
  return (
    <Seo
      title={frontmatter.title || "CypherX"}
      description={
        frontmatter.description || "CypherX project and service information."
      }
      image={frontmatter.image}
      canonical={canonical}
      type={frontmatter.type === "blog" ? "article" : "website"}
      datePublished={frontmatter.date}
      author={frontmatter.type === "blog" ? "CypherX" : undefined}
    />
  );
};

export default MdxHead;
