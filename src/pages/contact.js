import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import ContactForm from "../components/Contact.js";

const Contact = () => {
  return (
    <Layout>
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

export const Head = () => (
  <SEO
    title="Contact"
    description="Contact CypherX about software, AI systems, digital assets, or engineering delivery."
    canonical="https://cypherx.tech/contact/"
  />
);

export default Contact;
