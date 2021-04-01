module.exports = {
  siteMetadata: {
    logo: `/svg/Logo.svg`,
    title: `CypherX`,
    subtitle: `Software. Quality. Security.`,
    description: `We help startups and businesses utilize the capabilities of blockchain technologies. Building software since 2011, we’ve applied our combined expertise in creating innovation that brings new levels of openness, productivity, and automation to our clients' business processes.`,
    author: `@selimerunkut`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    /*     {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `svg`,
        path: `${__dirname}/src/svg`,
      },
    }, */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
