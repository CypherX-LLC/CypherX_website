import React from "react";
import { Link } from "gatsby";
import CTA from "../data/cta.yml";

const CallToAction = () => {
  return (
    <section id="cta" className="cta_section">
      <div className="wrapper cta_content">
        <div className="cta_intro">
          <img src={CTA.image} alt="CTA" />
          <div className="cta_descr">
            <h2>{CTA.title}</h2>
            <p>{CTA.description}</p>
            <Link to={CTA.contact_link}>{CTA.contact_title}</Link>
          </div>
        </div>
        <div className="cta_form">
          <p>{CTA.question}</p>
          <h2>{CTA.subtitle}</h2>
          <form action={CTA.form_action}>
            <input type="email" placeholder={CTA.input_label} className="email" /> 
            <input type="subscribe" value={CTA.subscribe} name={CTA.subscribe} className="subscribe_button" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
