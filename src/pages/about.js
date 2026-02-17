import React from "react";
import { Link } from "gatsby";
import aboutData from "../data/about.yml";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

const About = () => {
  const Pars = aboutData.description.map((item, k) => {
    return <p key={"p-" + k}>{item}</p>;
  });
  const Members = aboutData.members.map((member, k) => {
    const infoContent = Array.isArray(member.info) ? (
      member.info.map((para, i) => (
        <p key={i} className="m_info_para">
          {para}
        </p>
      ))
    ) : (
      <p className="m_info">{member.info}</p>
    );

    return (
      <div className="team_card" key={"tk" + k}>
        <img src={member.image} alt={member.title} />
        <h3>{member.title}</h3>
        <h4 className="m_position">{member.position}</h4>
        <div className="m_info_container">{infoContent}</div>
        {member.linkedin && (
          <div className="linkedin_container">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin_link"
            >
              LinkedIn Profile
            </a>
          </div>
        )}
      </div>
    );
  });
  return (
    <Layout>
      <SEO title="About" description="Selim Erunkut, Co-founder of CypherX" />
      <section className="about">
        <div className="about_top">
          <div className="top_grid wrapper">
            <div className="top_left">
              <h1>{aboutData.title}</h1>
              {Pars}
              <Link to={aboutData.cta.link}>{aboutData.cta.title}</Link>
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
    </Layout>
  );
};

export default About;
