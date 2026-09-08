import React from "react";
import { Link } from "gatsby";
import aboutData from "../data/about.yml";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import "../components/editorial-pages.css";

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
      <article className="team_card" key={"tk" + k}>
        <img src={member.image} alt={member.title} />
        <div className="editorial-member-copy">
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
      </article>
    );
  });
  return (
    <Layout>
      <div className="about editorial-page editorial-about">
        <section
          className="editorial-page-hero"
          aria-labelledby="about-mission-title"
        >
          <div className="editorial-page-hero-grid">
            <div>
              <h1 id="about-mission-title">{aboutData.title}</h1>
              <div className="editorial-page-body">{Pars}</div>
              <Link className="editorial-page-button" to={aboutData.cta.link}>
                {aboutData.cta.title}
              </Link>
            </div>
            <div className="editorial-about-statement">
              <h2>{aboutData.subtitle1}</h2>
            </div>
          </div>
        </section>
        <section
          className="editorial-page-section"
          aria-labelledby="about-team-title"
        >
          <div className="editorial-page-section-head">
            <h2 id="about-team-title">{aboutData.subtitle2}</h2>
          </div>
          <div className="team_grid">{Members}</div>
        </section>
      </div>
    </Layout>
  );
};

export const Head = () => (
  <SEO
    title="About"
    description="CypherX mission, founders, and software engineering practice."
    canonical="https://cypherx.tech/about/"
  />
);

export default About;
