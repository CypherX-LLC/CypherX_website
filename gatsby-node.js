const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "./src/components"),
        "~image": path.resolve(__dirname, "./src/assets/image"),
        "~data": path.resolve(__dirname, "./src/content"),
        "~data": path.resolve(__dirname, "./src/data"),
        "~scss": path.resolve(__dirname, "./src/scss"),
      }
    }
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const results = await graphql(`
  query allMdxPages {
    features: allFile(filter: {sourceInstanceName: {eq: "features"}}) {
      edges {
        node {
          childrenMdx {
            frontmatter {
              description
              image
              slug
              title
            }

            body
          }

          sourceInstanceName
          name
        }
      }
    }

    posts: allFile(filter: {sourceInstanceName: {eq: "posts"}}) {
      edges {
        node {
          childrenMdx {
            frontmatter {
              description
              image
              slug
              title
            }

            body
          }

          sourceInstanceName
        }
      }
    }

    allMdx(filter: {frontmatter: {type: {eq: "feature"}}}) {
      edges {
        node {
          frontmatter {
            title
            image
            slug
          }
          id
          body
        }
      }
    }
  }

`)
results.data.allMdx.edges.forEach(item => {
  console.log(item,"gggggggggg");
  createPage({
        path: `/features/${item.node.frontmatter.slug}/`,
        component: require.resolve("./src/templates/detailsPage.js"),
        context: {
          title: item.node.frontmatter.title,
          image: item.node.frontmatter.image,
          body: item.node.body,
        },
      })
    }
  )
}
