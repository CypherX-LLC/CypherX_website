import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import EditorialHome from "../components/EditorialHome";
import SEO from "../components/Seo";

const IndexPage = ({ data }) => (
  <Layout>
    <EditorialHome posts={data.allMdx.nodes} />
  </Layout>
);

export const query = graphql`
  query HomePosts {
    allMdx(
      limit: 3
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { type: { eq: "blog" } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          description
          date(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`;

export const Head = () => (
  <SEO
    title="Home"
    description="CypherX builds software, AI systems, digital-asset infrastructure, and engineering delivery practices."
    canonical="https://cypherx.tech/"
  />
);

export default IndexPage;
