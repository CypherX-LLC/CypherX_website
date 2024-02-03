import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import styled from "styled-components";

const Wrapper = styled.article`
width: 96%;
margin: 120px auto;
max-width: 900px;
`
const H2 = styled.h2`
font-size: 1.5rem !important;
line-height: 1.1;
a {
  text-decoration: none;
  &:hover {color: darkblue;}
  }

`

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
          <Seo title="Blog" />
      <Wrapper>
          <h1>Blog</h1>
      <ul className='posts_list'>
      {
        data.allMdx.nodes.map(node => {
          return (
          <li key={node.id}>
            {node.frontmatter.image ? <img src={node.frontmatter.image} alt={node.frontmatter.title} /> : <img src={data.site.siteMetadata.default_image} alt={node.frontmatter.title} />}
            <div className='text_box'>
            <H2>
              <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </H2>
            <p>Posted: {node.frontmatter.date}</p>
            <p>{node.frontmatter.description}</p>
            </div>
          </li>)
        })
      }
      </ul>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC }}) {
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

`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage