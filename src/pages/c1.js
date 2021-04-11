import React from "react";
//import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ContactForm from "../components/Contact.js";

const Contact = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <section className="contact">
        <div className="about_top">
          <div className="top_grid wrapper">
            <div className="top_left">
              <ContactForm />
            </div>
            <div className="top_right"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
