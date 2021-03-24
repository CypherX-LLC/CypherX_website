/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../scss/post_style.scss"

import Header from "./header"

const Mdx = ({ children, props }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      mdx {
        frontmatter {
          title
          date
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      ></div>
      <div className="post">
        <h1>{data.mdx.frontmatter.title}</h1>
        {children}
      </div>
    </>
  )
}

export default Mdx
