import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

export const Seo = ({
  description,
  lang,
  title,
  image,
  type,
  datePublished,
  author,
  canonical,
  noindex,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query SeoSiteMetadata {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            default_image
          }
        }
      }
    `
  );
  const metadata = site?.siteMetadata || {};
  const siteUrl = metadata.siteUrl || "https://cypherx.tech";
  const metaDescription = description || metadata.description || "CypherX";
  const url = canonical || siteUrl;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}${metadata.default_image || "/images/cypherx_logo.png"}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    name: title,
    headline: type === "article" ? title : undefined,
    description: metaDescription,
    url,
    image: type === "article" ? imageUrl : undefined,
    datePublished: type === "article" ? datePublished : undefined,
    author:
      type === "article" && author
        ? { "@type": "Organization", name: author }
        : undefined,
    publisher:
      type === "article"
        ? {
            "@type": "Organization",
            name: metadata.title || "CypherX",
            url: siteUrl,
          }
        : undefined,
    ...(type !== "article"
      ? {
          isPartOf: {
            "@type": "WebSite",
            name: metadata.title || "CypherX",
            url: siteUrl,
          },
        }
      : {}),
  };
  const cleanJsonLd = JSON.parse(JSON.stringify(jsonLd));
  return (
    <>
      <html lang={lang} />
      <title>
        {title}
        {metadata.title ? ` | ${metadata.title}` : ""}
      </title>
      <meta name="description" content={metaDescription} />
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:type"
        content={type === "article" ? "article" : "website"}
      />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <script type="application/ld+json">
        {JSON.stringify(cleanJsonLd).replace(/</g, "\\u003c")}
      </script>
    </>
  );
};
Seo.defaultProps = {
  description: "",
  lang: "en",
  image: undefined,
  type: "website",
  datePublished: undefined,
  author: undefined,
  canonical: "https://cypherx.tech",
  noindex: false,
};
Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string,
  datePublished: PropTypes.string,
  author: PropTypes.string,
  canonical: PropTypes.string,
  noindex: PropTypes.bool,
};
export default Seo;
