import React from 'react';
import MDXRenderer from 'gatsby-plugin-mdx';
import Layout from '~components/Layout'

const header = {
  headerClasses: "site-header site-header--menu-end dark-header site-header--sticky",
  containerFluid:false,
  darkLogo:false,
}

export default function Service({
  pageContext,}) {
  return (
    <Layout innerPage={true} headerConfig={header}>
      <div class="post_wrapper">
          <h1>{pageContext.title}</h1>
          <img src={pageContext.image} alt={pageContext.title} />
          <hr/>
          <MDXRenderer>{pageContext.body}</MDXRenderer> 
      </div>
    </Layout>
  );
}
