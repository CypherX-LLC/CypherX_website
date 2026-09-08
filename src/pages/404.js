import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/Seo";

const NotFoundPage = () => (
  <Layout>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export const Head = () => (
  <SEO
    title="Page not found"
    description="The requested page was not found."
    noindex
    canonical="https://cypherx.tech/404/"
  />
);

export default NotFoundPage;
