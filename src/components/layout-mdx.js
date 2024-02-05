import React from "react"
import Layout from '~components/Layout'
import Seo from '~components/Seo'

const Mdx = ({ children }) => {
  const meta = children.props.pageContext.frontmatter

  return (
    <Layout pageTitle={meta.title}>
      <div className="post_wrapper">
        <h1>{meta.title}</h1>
        <br/>
        {meta.image ? 
        <img src={meta.image} alt={meta.title} /> : ""}
        {children}
      </div>
    </Layout>
  )
}

export const Head = ({ meta }) => <Seo title={meta.title} />

export default Mdx
