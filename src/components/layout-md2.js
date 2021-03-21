import React from "react"
import Layout from "./layout"

export default ({ children, pageContext }) => {
  return (
    <Layout>
      <h1>{pageContext.frontmatter.title}</h1>
      <article>{children}</article>
    </Layout>
  )
}
