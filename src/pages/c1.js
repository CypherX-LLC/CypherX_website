import React from "react";
//import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Contact from "../components/Contact.yml";
import CTA from "../data/contact.yml";

const Contact = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <section className="contact">
        <div className="about_top">
          <div className="top_grid wrapper">
            <div className="top_left">
              <Contact />
            </div>
            <div className="top_right"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
