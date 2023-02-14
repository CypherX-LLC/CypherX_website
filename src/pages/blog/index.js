import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
          <Seo title="Blog" />
      <ul className='posts_list'>
      {
        data.allMdx.nodes.map(node => {
          return (
          <li key={node.id}>
            {node.frontmatter.image ? <img src={node.frontmatter.image} alt={node.frontmatter.title} /> : <img src={data.site.siteMetadata.default_image} alt={node.frontmatter.title} />}
            <div className='text_box'>
            <h2>
              <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
            <p>{node.frontmatter.description}</p>
            </div>
          </li>)
        })
      }
      </ul>
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