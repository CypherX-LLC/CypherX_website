module.exports = {
  siteMetadata: {
    logo: `CypherX`,
    logo_image: `/svg/Logo.svg`,
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
    {
      resolve: "gatsby-plugin-favicons",
      options: {
        logo: "./src/images/android-chrome-512x512.png",
        appName: "GypherX",
        //start_url: "/",
        background: "#fff",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          yandex: false,
          windows: true,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GypherX website`,
        short_name: `GypherX`,
        //start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `##ffffff`,
        display: `standalone`,
        icons: [
          {
            src: "./src/images/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./src/images/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
