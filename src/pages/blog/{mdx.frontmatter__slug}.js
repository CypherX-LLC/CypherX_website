import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPost = ({ data, children }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <div className='post_wrapper'>
      <h1>{data.mdx.frontmatter.title}</h1>
      {data.mdx.frontmatter.description ? <b>{data.mdx.frontmatter.description}</b> : "" }
      <p>{data.mdx.frontmatter.date}</p>
      {data.mdx.frontmatter.image ? 
      <img src={data.mdx.frontmatter.image} alt={data.mdx.frontmatter.title} /> : ""}
      {children}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter { 
        title
        date(formatString: "MMMM D, YYYY")
        description
        image
        slug
      }
    }
  }

`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost