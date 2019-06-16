const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const remark = require('remark')
const remarkHTML = require('remark-html')
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
              path
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
  pages
    .filter(edge => edge.node.frontmatter.templateKey)
    .forEach(edge => {
      const id = edge.node.id
      const pagePath = edge.node.fields.path
      createPage({
        path: pagePath,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`
        ),
        // additional data can be passed via context
        context: {
          id,
          page: pagePath,
        },
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    const pagePath = (() => {
      if (slug.endsWith('en/')) {
        if (slug.includes('home')) return '/'
        else return slug.replace('en/', '')
      } else if (slug.endsWith('es/')) {
        if (slug.includes('home')) return '/es/'
        else return '/es' + slug.replace('es/', '')
      } else {
        return slug
      }
    })()

    createNodeField({
      name: `slug`,
      node,
      value: slug
    })

    createNodeField({
      name: 'path',
      node,
      value: pagePath
    })

    if (node.frontmatter && node.frontmatter && node.frontmatter.templateKey === 'schedule-page') {
      node.frontmatter.actions.forEach(a => {
        a.info = remark()
          .use(remarkHTML)
          .processSync(a.info)
          .toString()
        a.events.forEach(e => {
          e.details = remark()
            .use(remarkHTML)
            .processSync(e.details)
            .toString()
        })
      })
    }
  }
}