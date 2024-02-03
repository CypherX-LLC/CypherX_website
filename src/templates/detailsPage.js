import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Layout from '~components/Layout'

const shortcodes = { Link } // Provide common components here

const header = {
  headerClasses: "site-header site-header--menu-end dark-header site-header--sticky",
  containerFluid:false,
  darkLogo:false,
}

function PostTemplate({ data: { mdx }, children }) {
  console.log(mdx,children);
  return (
    <Layout innerPage={true} headerConfig={header}>
      <div class="post_wrapper">
          <h1>{mdx.frontmatter.title}</h1>
          <img src={mdx.frontmatter.image} alt={mdx.frontmatter.title} />
          <hr/>
          <MDXProvider components={shortcodes}>
            {children}
            <p>Lorem ipsum dolor</p>
          </MDXProvider>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PostTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        image
      }
    }
  }

`
export default PostTemplate
