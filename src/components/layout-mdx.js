import React from "react";
import Layout from "~components/Layout";

const Mdx = ({ children }) => {
  const meta = children.props.pageContext.frontmatter;

  return (
    <Layout pageTitle={meta.title}>
      <div className="post_wrapper">
        <h1>{meta.title}</h1>
        <br />
        {meta.image ? <img src={meta.image} alt={meta.title} /> : ""}
        {children}
      </div>
    </Layout>
  );
};

export { default as Head } from "./MdxHead";

export default Mdx;
