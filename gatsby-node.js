const path = require("path");

// The collection filename matches all MDX nodes, including services without slugs.
exports.onCreatePage = ({ page, actions, getNode }) => {
  const blogTemplate = path.resolve(
    __dirname,
    "src/pages/blog/{mdx.frontmatter__slug}.js"
  );
  if (page.component.split("?")[0] !== blogTemplate) return;
  const node = getNode(page.context.id);
  if (node?.frontmatter?.type !== "blog" || !node.frontmatter.slug) {
    actions.deletePage(page);
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "./src/components"),
        "~image": path.resolve(__dirname, "./src/assets/image"),
        "~data": path.resolve(__dirname, "./src/content"),
        "~data": path.resolve(__dirname, "./src/data"),
        "~scss": path.resolve(__dirname, "./src/scss"),
      },
    },
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
