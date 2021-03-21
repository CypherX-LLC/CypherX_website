import React from "react"
//import { Link } from "gatsby"

import Layout from "../components/layout"
import Opening from "../components/Opening";
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Offering from "../components/Offering"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
   <Opening />
   <Features />
   <Testimonials />
   <Offering />
  </Layout>
)

export default IndexPage
