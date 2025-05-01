import React from "react"
//import { Link } from "gatsby"
import CTA from "../components/CTA";
import Layout from "../components/Layout"
import Opening from "../components/Opening";
import Portfolio from "../components/Portfolio"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Offering from "../components/Offering"
import SEO from "../components/Seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
   <Opening />
   <Features />
   <Portfolio />
   <Testimonials />
   <Offering />
   <CTA />
  </Layout>
)

export default IndexPage
