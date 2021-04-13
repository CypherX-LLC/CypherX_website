import React from "react";
import { Link } from "gatsby";
import aboutData from "../data/about.yml";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Cookie from "../components/Cookies";

const About = () => {
  const Pars = aboutData.description.map((item, k) => {
    return <p key={"p-" + k}>{item}</p>;
  });
  const Members = aboutData.members.map((member, k) => {
    return (
      <div className="team_card" key={"tk" + k}>
        <img src={member.image} alt={member.title} />
        <h3>{member.title}</h3>
        <h4 className="m_position">{member.position}</h4>
        <p className="m_info">{member.info}</p>
      </div>
    );
  });
  return (
    <Layout>
      <SEO title="About" />
      <section className="about">
        <div className="about_top">
          <div className="top_grid wrapper">
            <div className="top_left">
              <h1>{aboutData.title}</h1>
              {Pars}
              <Link to="{About_data.cta.link}">{aboutData.cta.title}</Link>
            </div>
            <div className="top_right">
              <h2>{aboutData.subtitle1}</h2>
            </div>
          </div>
        </div>
         <div className="team_box wrapper">
          <h2>{aboutData.subtitle2}</h2>
          <div className="team_grid">{Members}</div>
        </div>
      </section>
      <Cookie />
    </Layout>
  );
};

export default About;
