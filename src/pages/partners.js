import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

const Page = styled.div`
  padding: 10rem 1.5rem 5rem;
  background: linear-gradient(180deg, #f7f8fc 0%, #ffffff 42%);
`;

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const Hero = styled.section`
  max-width: 820px;
  margin: 0 auto 4rem;
  text-align: center;

  h1 {
    margin-bottom: 1.25rem;
    font-size: clamp(2.5rem, 6vw, 5.25rem);
    line-height: 1.05;
    letter-spacing: -0.05em;
  }

  p {
    margin: 0 auto;
    max-width: 720px;
    font-size: clamp(1.1rem, 2vw, 1.45rem);
    line-height: 1.6;
  }
`;

const Eyebrow = styled.p`
  && {
    margin-bottom: 1rem;
    color: #8c30f5;
    font-size: clamp(0.95rem, 1.4vw, 1.1rem);
    font-weight: 700;
    letter-spacing: 0.14em;
    line-height: 1.4;
    text-transform: uppercase;
  }
`;

const Section = styled.section`
  margin: 0 auto 4rem;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    font-size: clamp(1.8rem, 3vw, 2.75rem);
    letter-spacing: -0.03em;
  }

  > p {
    max-width: 780px;
    margin-right: auto;
    margin-left: auto;
    line-height: 1.7;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  padding: 2rem;
  text-align: center;
  border: 1px solid #e4e7ec;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 45px rgba(24, 25, 31, 0.07);

  h3 {
    margin: 0 0 0.75rem;
    font-size: 1.45rem;
  }

  p {
    margin: 0;
    line-height: 1.7;
  }
`;

const Steps = styled.ol`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  padding: 0;
  margin: 2rem 0 0;
  list-style: none;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.li`
  padding: 1.35rem;
  border-top: 3px solid #8c30f5;
  background: #f7f8fc;

  span {
    display: block;
    margin-bottom: 0.75rem;
    color: #8c30f5;
    font-size: 0.85rem;
    font-weight: 700;
  }

  strong {
    display: block;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.55;
  }
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PlainList = styled.ul`
  max-width: 720px;
  padding: 0;
  margin: 1.25rem auto 0;
  text-align: left;
  list-style: none;

  li {
    position: relative;
    padding-left: 1.6rem;
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  li::before {
    position: absolute;
    top: 0.1rem;
    left: 0;
    color: #8c30f5;
    content: "✓";
    font-weight: 700;
  }
`;

const Note = styled.p`
  padding: 1.25rem 1.5rem;
  border-left: 4px solid #d69e2e;
  background: #fffaf0;
  font-size: 0.95rem;
  line-height: 1.65;
`;

const FinePrint = styled.section`
  margin-top: 4rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e4e7ec;
  color: #5e6470;

  h2 {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    letter-spacing: 0;
  }

  p {
    max-width: 900px;
    margin: 0 auto 0.75rem;
    color: #5e6470;
    font-size: 0.78rem;
    line-height: 1.6;
    text-align: center;
  }

  a {
    color: #6f20c6;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.9rem 1.35rem;
  border-radius: 999px;
  background: #8c30f5;
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: #6f20c6;
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: 0.9rem 1.35rem;
  border: 1px solid #18191f;
  border-radius: 999px;
  color: #18191f;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: #18191f;
    color: #ffffff;
  }
`;

const Partners = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://cypherx.tech/partners/",
        url: "https://cypherx.tech/partners/",
        name: "Partner with CypherX",
        description:
          "Refer software, AI automation, and digital asset projects to CypherX through a clear, non-exclusive partner program.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://cypherx.tech/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Partners",
            item: "https://cypherx.tech/partners/",
          },
        ],
      },
    ],
  };

  return (
    <Layout>
      <SEO
        title="Partner with CypherX"
        description="Refer software, AI automation, and digital asset projects to CypherX through a clear, non-exclusive partner program."
        structuredData={structuredData}
      />
      <Page>
        <Container>
          <Hero>
            <Eyebrow>CypherX partner program</Eyebrow>
            <h1>Turn trusted introductions into useful delivery.</h1>
            <p>
              Work with CypherX when a client needs software engineering, AI
              automation, quality assurance, security, or digital asset
              development that your team does not want to deliver alone.
            </p>
          </Hero>

          <Section>
            <h2>Two ways to work together</h2>
            <p>
              The program is built for people who already understand their
              clients&apos; problems. You can make a qualified introduction and
              step back, or stay involved when a joint delivery makes sense.
            </p>
            <CardGrid>
              <Card>
                <h3>Referral partner</h3>
                <p>
                  Introduce a company that needs a capable technical team. We
                  qualify the opportunity, scope the work, prepare the proposal,
                  and manage delivery. You can refer a single project or make
                  introductions regularly.
                </p>
              </Card>
              <Card>
                <h3>Delivery partner</h3>
                <p>
                  Bring CypherX into projects where your agency, consultancy, or
                  freelance practice needs additional engineering capacity or a
                  specialist capability. We agree responsibilities and client
                  communication before work begins.
                </p>
              </Card>
            </CardGrid>
          </Section>

          <Section>
            <h2>How the partner process works</h2>
            <Steps>
              <Step>
                <span>01</span>
                <strong>Spot the need</strong>
                <p>Identify a real business problem, not a cold list.</p>
              </Step>
              <Step>
                <span>02</span>
                <strong>Make an introduction</strong>
                <p>Share the context and connect us with the decision-maker.</p>
              </Step>
              <Step>
                <span>03</span>
                <strong>Qualify together</strong>
                <p>We confirm fit, scope, timing, and the right next step.</p>
              </Step>
              <Step>
                <span>04</span>
                <strong>Deliver the work</strong>
                <p>
                  CypherX handles the agreed technical delivery and updates.
                </p>
              </Step>
              <Step>
                <span>05</span>
                <strong>Receive your commission</strong>
                <p>Approved referral fees are paid after the client pays us.</p>
              </Step>
            </Steps>
          </Section>

          <Split>
            <Section>
              <h2>Who we work well with</h2>
              <p>
                Our partners are usually close to businesses that need better
                systems but do not want to manage a large technical search.
              </p>
              <PlainList>
                <li>Digital and e-commerce agencies</li>
                <li>Business and technology consultants</li>
                <li>Freelance developers and solution architects</li>
                <li>Web, branding, and growth studios</li>
                <li>Operators with trusted business networks</li>
              </PlainList>
            </Section>
            <Section>
              <h2>Where CypherX can help</h2>
              <p>
                We can assess and deliver projects involving AI agent
                engineering, workflow automation, software quality, security
                reviews, custom platforms, and digital asset systems.
              </p>
              <PlainList>
                <li>AI agents and business process automation</li>
                <li>Custom web applications and operational platforms</li>
                <li>Quality assurance, testing, and technical due diligence</li>
                <li>Secure integrations and data workflows</li>
                <li>Web3 and digital asset products</li>
              </PlainList>
            </Section>
          </Split>

          <Section>
            <h2>Have a project to discuss?</h2>
            <p>
              Know a business that needs help? Share the context early, and we
              will tell you quickly whether CypherX is the right technical fit.
            </p>
            <Actions>
              <Button to="/contact">Share a project</Button>
              <SecondaryButton
                href="https://calendly.com/selim_cypherx_tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </SecondaryButton>
            </Actions>
          </Section>

          <Section>
            <h2>Commercial terms</h2>
            <p>
              Our proposed referral commission is 20% of net project fees
              actually received by CypherX for an accepted referral. A written
              partner agreement confirms the rate, attribution, scope, payment
              timing, and any project-specific terms before work begins.
            </p>
            <PlainList>
              <li>
                Commission is calculated after payment is received from the
                client.
              </li>
              <li>
                Net project fees exclude VAT or sales tax, refunds, chargebacks,
                pass-through costs, third-party fees, and approved expenses.
              </li>
              <li>
                A referral must be new, identifiable, and accepted by CypherX
                before proposal work begins.
              </li>
              <li>
                The program is non-exclusive. There is no minimum number of
                referrals and no obligation to refer work.
              </li>
              <li>
                Existing opportunities, duplicate introductions, and referrals
                that cannot be attributed to the partner are excluded unless we
                agree otherwise in writing.
              </li>
            </PlainList>
          </Section>

          <Section>
            <h2>Partner standards</h2>
            <p>
              Trust is part of the referral. Partners must describe CypherX
              accurately, avoid promises about price or outcomes that we have
              not approved, and make it clear when they are introducing us as an
              independent partner.
            </p>
            <PlainList>
              <li>No authority to sign contracts or bind CypherX.</li>
              <li>No misleading claims, spam, or purchased contact lists.</li>
              <li>Share personal data only when there is a lawful basis.</li>
              <li>Keep client information confidential.</li>
              <li>
                Follow applicable marketing, privacy, and anti-bribery laws.
              </li>
            </PlainList>
          </Section>

          <Note>
            This page describes a partner opportunity and is not a binding offer
            or contract. No referral is accepted until CypherX confirms it in
            writing. The final partner agreement controls commission
            eligibility, attribution, payment, taxes, confidentiality, data
            processing, intellectual property, termination, and dispute terms.
            Partners are independent contractors and do not act as employees,
            agents, or representatives of CypherX unless a written agreement
            says otherwise.
          </Note>

          <Section>
            <h2>Ready to explore a partnership?</h2>
            <p>
              Tell us who you help, which markets you know, and whether you want
              to refer projects or deliver them together. A short message is
              enough to start the conversation.
            </p>
            <Actions>
              <Button to="/contact">Start a partner conversation</Button>
              <SecondaryButton
                href="https://calendly.com/selim_cypherx_tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </SecondaryButton>
            </Actions>
          </Section>

          <FinePrint>
            <h2>Marketing and privacy note</h2>
            <p>
              If you recommend CypherX for compensation, disclose that
              relationship where applicable. The U.S. Federal Trade Commission
              says material connections in endorsements should be clear and
              conspicuous. UK guidance also distinguishes corporate contacts
              from sole traders and confirms that data protection rules still
              apply to business-to-business marketing.
            </p>
            <p>
              Read the official guidance from the{" "}
              <a
                href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking"
                target="_blank"
                rel="noopener noreferrer"
              >
                FTC
              </a>{" "}
              and the{" "}
              <a
                href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                UK ICO
              </a>
              . These links are general references, not legal advice. Confirm
              the rules that apply to your country, audience, and marketing
              channel before contacting a prospect.
            </p>
          </FinePrint>
        </Container>
      </Page>
    </Layout>
  );
};

export default Partners;
