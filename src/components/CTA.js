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
      </div>
    </section>
  );
};

export default CallToAction;
