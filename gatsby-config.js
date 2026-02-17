module.exports = {
  siteMetadata: {
    siteUrl: `https://cypherx.tech`,
    logo: `CypherX`,
    logo_image: `/svg/Logo.svg`,
    default_image: `/images/cypherx_logo.png`,
    title: `CypherX`,
    subtitle: `Software. Quality. Security.`,
    description: `We help startups and enterprises grow with fullstack solutions and web3 technologies. Our knowledge expands into Industry 4.0 - smart factories, automation, and precision systems with tailored, future-ready tech.`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `features`,
        path: `${__dirname}/src/features/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/src/portfolio/`,
      },
    },
    /* {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/posts`,
        name: `blog` 
      },
    }, */
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/features`,
        name: `features`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/portfolio`,
        name: `portfolio`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        path: `${__dirname}/src/posts/`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
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
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-S13WG7NBX8"],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: "G-S13WG7NBX8", //"YOUR_GOOGLE_ANALYTICS_TRACKING_ID", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        googleTagManager: {
          trackingId: "AW-11095403621", //"YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-tagmanager", // default
          dataLayerName: "dataLayer", // default
        },
        facebookPixel: {
          pixelId: "", //"YOUR_FACEBOOK_PIXEL_ID", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-facebook-pixel", // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
