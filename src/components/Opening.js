import React from "react";
import { StaticQuery, graphql } from "gatsby";
//import Image from "./image";

import { Link } from "gatsby";
//import Container from "./Container";
//import Nav from "../data/navigation.yml"; 

export default function Opening() {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
              subtitle
              description
            }
          }
        }
      `}
      render={(data) => (
        <section
          id="opening"
          className="hero_section"
          data-title="Opening"
          data-name="opening"
        >
          <div className="container">
            <div className="wrapper intro">
              <div className="triangular hidden_small">
                <img
                  src="/images/imgbin_graphics-website-wireframe-wire-frame-model-globe-sphere-png 1.png"
                  alt="triangular"
                />
              </div>
              <div className="text_box">
                <h1 className="site_title">{data.site.siteMetadata.title}</h1>
                <h2 className="site_subtitle">
                  {data.site.siteMetadata.subtitle}
                </h2>
                <p className="site_transcription">
                  {data.site.siteMetadata.description}
                </p>
                <Link to="#features" className="l_more">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    />
  );
}
