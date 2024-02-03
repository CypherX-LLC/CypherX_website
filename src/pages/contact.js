import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
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
