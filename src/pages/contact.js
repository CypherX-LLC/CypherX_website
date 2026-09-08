import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import ContactForm from "../components/Contact.js";
import "../components/editorial-pages.css";

const Contact = () => {
  return (
    <Layout>
      <div className="contact editorial-page editorial-contact-page">
        <section
          className="editorial-page-hero"
          aria-labelledby="contact-page-title"
        >
          <ContactForm />
        </section>
      </div>
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
