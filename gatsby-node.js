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

/* exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const results = await graphql(`
  query allMdxPages {
    allMdx(filter: {frontmatter: {type: {eq: "feature"}}}) {
      edges {
        node {
          frontmatter {
            permalink
          }

          id
          internal {
            contentFilePath
          }        }
      }
    }
  }

`)
if (results.errors) {
  reporter.panicOnBuild('Error loading MDX result', result.errors)
}

const postTemplate = path.resolve(`./src/templates/detailsPage.js`)

results.data.allMdx.edges.forEach(item => {
  createPage({
        path: `/adidas/${item.node.frontmatter.permalink}/`,
        component: item.node.internal.contentFilePath,
        context: {
          id: item.node.id,
        },
      })
    }
  )
} */
