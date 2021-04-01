import React from "react";
//import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import CTA from "../data/contact.yml";

const Contact = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <section className="contact">
        <div className="about_top">
          <div className="top_grid wrapper">
            <div className="top_left">
              <form
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
                name="contact"
                >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />

              <div className="contact_grid">
                <h1>{CTA.title}</h1>
                <p>{CTA.description}</p>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full name"
                    className="email"
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="email"
                  />
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    cols="30"
                    placeholder="Message"
                  />
                  <input
                    type="submit"
                    value="Send"
                    name="send"
                    id="send"
                    className="subscribe_button"
                  />
                </div>
              </form>
            </div>
            <div className="top_right"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
