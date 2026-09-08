import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import styled from "styled-components";

const Wrapper = styled.article`
  width: min(900px, 100%);
  padding: 0 20px;
  margin: 64px auto;
  max-width: 900px;
  p {
    font-size: 18px !important;
    line-height: 1.6;
  }
`;
const H2 = styled.h2`
  font-size: 1.5rem !important;
  line-height: 1.1;
  a {
    text-decoration: none;
    &:hover {
      color: darkblue;
    }
  }
`;

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <Wrapper>
        <h1>Blog</h1>
        <ul className="posts_list">
          {data.allMdx.nodes.map((node) => {
            return (
              <li key={node.id}>
                {node.frontmatter.image ? (
                  <img
                    src={node.frontmatter.image}
                    alt={node.frontmatter.title}
                  />
                ) : (
                  <img
                    src={data.site.siteMetadata.default_image}
                    alt={node.frontmatter.title}
                  />
                )}
                <div className="text_box">
                  <H2>
                    <Link to={`/blog/${node.frontmatter.slug}`}>
                      {node.frontmatter.title}
                    </Link>
                  </H2>
                  <br />
                  {/* <p>Posted: {node.frontmatter.date}</p> */}
                  <p>{node.frontmatter.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { type: { eq: "blog" } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
          description
          image
        }

        id
      }
    }

    site {
      siteMetadata {
        default_image
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title="Blog"
    description="Published technical articles from CypherX on software, AI systems, security, and digital assets."
    canonical="https://cypherx.tech/blog/"
  />
);

export default BlogPage;
