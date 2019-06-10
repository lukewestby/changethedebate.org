const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const pages = result.data.allMarkdownRemark.edges
  pages.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.fields.slug
    console.log(slug)
    createPage({
      path: slug.endsWith('en/') ?
        slug.replace('en/', '') :
        slug.endsWith('es/') ?
          '/es' + slug.replace('es/', '') :
          slug,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}