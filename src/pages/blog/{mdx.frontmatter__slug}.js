import * as React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import BlogCta from "../../components/BlogCta";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

const mdxComponents = { BlogCta };

const BlogPost = ({ data, children }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <div className="post_wrapper">
        <h1>{data.mdx.frontmatter.title}</h1>
        {data.mdx.frontmatter.description ? (
          <b>{data.mdx.frontmatter.description}</b>
        ) : (
          ""
        )}
        <br />
        <br />
        {data.mdx.frontmatter.image ? (
          <img
            src={data.mdx.frontmatter.image}
            alt={data.mdx.frontmatter.title}
          />
        ) : (
          ""
        )}
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        description
        image
        slug
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default BlogPost;
