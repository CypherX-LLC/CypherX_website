import React from "react";
import { Link } from "gatsby";
import PortfolioData from "../data/portfolio.yml";
import FeaturesData from "../data/features.yml";
import "./editorial-home.css";
import Testimonials from "./Testimonials";
import ProjectIllustration from "./ProjectIllustration";

const EditorialHome = ({ posts }) => {
  const projects = [
    PortfolioData.items[0],
    PortfolioData.items[2],
    PortfolioData.items[4],
  ];
  const services = [
    {
      title: "Build what’s next.",
      text: FeaturesData.items[0].text,
      link: FeaturesData.items[0].link,
    },
    {
      title: "Know where you stand.",
      text: `${FeaturesData.items[2].text} ${FeaturesData.items[3].text}`,
      link: FeaturesData.items[2].link,
    },
    {
      title: "Get delivery moving.",
      text: `${FeaturesData.items[5].text} ${FeaturesData.items[6].text}`,
      link: FeaturesData.items[5].link,
    },
  ];

  return (
    <div className="editorial-home">
      <section className="editorial-hero" aria-labelledby="hero-title">
        <div className="editorial-eyebrow">
          <span className="editorial-dot" /> Your engineering partner / CypherX
        </div>
        <div className="editorial-hero-grid">
          <div>
            <h1 id="hero-title">
              Complex Tech.
              <br />
              Clear <em>advantage.</em>
            </h1>
            <p className="editorial-intro">
              For founders and operators who need technology to move the
              business forward. We build software, de-risk systems, and help
              engineering teams deliver.
            </p>
            <div className="editorial-actions">
              <Link
                className="editorial-button editorial-button-primary"
                to="/contact"
              >
                Talk through your challenge <span aria-hidden="true">↗</span>
              </Link>
              <a className="editorial-text-link" href="#portfolio_section">
                See the work <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div
            className="editorial-diagram"
            role="img"
            aria-label="Tools, data, and teams connect through CypherX to build, deliver, and improve."
          >
            <div className="editorial-meta">
              <span>From friction to flow</span>
            </div>
            <div className="editorial-diagram-stage">
              <div className="editorial-nodes editorial-system-inputs">
                <span className="editorial-system-node">Tools</span>
                <span className="editorial-system-node">Data</span>
                <span className="editorial-system-node">Teams</span>
              </div>
              <strong className="editorial-system-core">CX</strong>
              <div className="editorial-nodes editorial-system-outputs">
                <span>Build</span>
                <span className="editorial-system-node">Deliver</span>
                <span>Improve</span>
              </div>
            </div>
          </div>
        </div>
        <div className="editorial-hero-foot">
          <div className="editorial-capabilities">
            <span>AI &amp; automation</span>
            <span>Software assurance</span>
            <span>Engineering leadership</span>
            <span>Digital assets</span>
          </div>
          <span>Built for the real world ↙</span>
        </div>
      </section>

      <section
        className="editorial-section editorial-work"
        id="portfolio_section"
        aria-labelledby="work-title"
      >
        <div className="editorial-section-head">
          <div>
            <div className="editorial-kicker">
              01 / Evidence, not adjectives
            </div>
            <h2 id="work-title">
              Less pitch.
              <br />
              More shipped.
            </h2>
          </div>
          <p>
            Real projects, real engineering decisions. A closer look at what
            CypherX builds and how it approaches hard problems.
          </p>
        </div>
        <div className="editorial-case-grid">
          {projects.map((project, index) => (
            <article className="editorial-case" key={project.title}>
              <div className="editorial-meta">
                <span>CypherX portfolio</span>
                <span>0{index + 1}</span>
              </div>
              <ProjectIllustration index={index} />
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <Link to={project.link}>
                Explore the project <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
        <details className="editorial-more-projects">
          <summary>More projects</summary>
          <ul>
            {PortfolioData.items
              .filter(
                (project) =>
                  !projects.some((featured) => featured.link === project.link)
              )
              .map((project) => (
                <li key={project.title}>
                  <Link to={project.link}>{project.title}</Link>
                </li>
              ))}
          </ul>
        </details>
      </section>

      <section
        className="editorial-section editorial-services"
        id="features"
        aria-labelledby="expertise-title"
      >
        <div>
          <div className="editorial-kicker">02 / Where we come in</div>
          <h2 id="expertise-title">
            What’s standing
            <br />
            in your way?
          </h2>
          <p className="editorial-lead">
            Start with the business problem. Bring in the engineering expertise
            it actually needs.
          </p>
        </div>
        <div>
          {services.map((service, index) => (
            <article className="editorial-service" key={service.title}>
              <span className="editorial-number">0{index + 1}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link
                  to={service.link}
                  aria-label={`Learn about ${service.title}`}
                >
                  Explore <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
          <details className="editorial-more-services">
            <summary>More services</summary>
            <ul>
              {FeaturesData.items
                .filter(
                  (service) =>
                    !services.some((featured) => featured.link === service.link)
                )
                .map((service) => (
                  <li key={service.link}>
                    <Link to={service.link}>{service.title}</Link>
                  </li>
                ))}
            </ul>
          </details>
        </div>
      </section>

      <section
        className="editorial-section editorial-approach"
        aria-labelledby="approach-title"
      >
        <div className="editorial-section-head">
          <div>
            <div className="editorial-kicker">03 / A clear way forward</div>
            <h2 id="approach-title">
              Understand it.
              <br />
              Build it.
              <br />
              Make it work.
            </h2>
          </div>
          <p>
            A focused engagement around the change you actually need, grounded
            in the software and systems already in front of you.
          </p>
        </div>
        <div className="editorial-process">
          <article>
            <span className="editorial-number">01</span>
            <h3>Find the leverage.</h3>
            <p>
              Map the problem, constraints, and current systems. Agree on what a
              useful result looks like.
            </p>
          </article>
          <article>
            <span className="editorial-number">02</span>
            <h3>Prove the approach.</h3>
            <p>
              Start with a focused assessment or build. Make important decisions
              visible before expanding scope.
            </p>
          </article>
          <article>
            <span className="editorial-number">03</span>
            <h3>Put it to work.</h3>
            <p>Integrate, document, and equip your team to own the result.</p>
          </article>
        </div>
      </section>

      <section
        className="editorial-journal"
        id="thinking"
        aria-labelledby="thinking-title"
      >
        <div>
          <div className="editorial-kicker">04 / Field notes</div>
          <h2 id="thinking-title">
            Thinking from
            <br />
            the work.
          </h2>
          <p>Practical perspectives from the existing CypherX blog.</p>
          <Link className="editorial-text-link" to="/blog/">
            Visit the blog <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div>
          <div className="editorial-kicker">Latest posts</div>
          {posts.map((post) => (
            <Link
              className="editorial-article"
              key={post.id}
              to={`/blog/${post.frontmatter.slug}`}
            >
              <span className="editorial-meta">{post.frontmatter.date}</span>
              <h3>
                {post.frontmatter.title} <span aria-hidden="true">↗</span>
              </h3>
              <p>{post.frontmatter.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div id="testimonials_section" className="editorial-reviews">
        <Testimonials />
      </div>
      <section className="editorial-faq" aria-labelledby="faq-title">
        <div>
          <div className="editorial-kicker">05 / Before we talk</div>
          <h2 id="faq-title">Fair questions.</h2>
        </div>
        <div>
          <details>
            <summary>Do you work with existing teams?</summary>
            <p>
              CypherX’s current services include engineering leadership,
              delivery optimization, and distributed team building. Working
              models are agreed for each engagement.
            </p>
          </details>
          <details>
            <summary>Is this only about AI?</summary>
            <p>
              No. The existing practice also covers software quality, technical
              due diligence, digital assets, and engineering leadership.
            </p>
          </details>
          <details>
            <summary>What happens after we get in touch?</summary>
            <p>
              Use the contact page to share the challenge and context. CypherX
              can then discuss a suitable next step.
            </p>
          </details>
        </div>
      </section>
      <section
        className="editorial-contact"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div>
          <div className="editorial-kicker">Your next move</div>
          <h2 id="contact-title">
            Bring the hard part.
            <br />
            Let’s work through it.
          </h2>
          <p>
            Tell us what you’re building, what’s getting in the way, and what
            needs to change.
          </p>
        </div>
        <Link className="editorial-button" to="/contact">
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
};

export default EditorialHome;
