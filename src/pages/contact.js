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
        <section className="editorial-page-section">
          <div className="editorial-page-body">
            <h2>Tell us about your project</h2>
            <p>
              Tell us what you are trying to solve, what is not working today,
              and which tools or technology stack your team uses. A little
              context about your goal helps us understand whether we can help.
              Share your expected timeline or deadline, plus any constraints
              that matter. Please do not include passwords, API keys, personal
              customer records, or other credentials in this message. You can
              also explore our work in{" "}
              <a href="/ai-agents-chat-voice-automation/">AI agents</a> and{" "}
              <a href="/quality-assurance/">quality assurance</a>, or read about{" "}
              <a href="/about/">our team</a>. If you prefer email, write to{" "}
              <a href="mailto:contact@cypherx.tech">contact@cypherx.tech</a>.
            </p>
          </div>
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
