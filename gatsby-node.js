// const path = require(`path`)
// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions
//   const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)
//   // Query for all products in Shopify
//   const result = await graphql(`
//     {
//       allShopifyProduct(sort: { fields: [title] }) {
//         edges {
//           node {
//             title
//             images {
//               originalSrc
//             }
//             availableForSale
//             handle
//             descriptionHtml
//             priceRange {
//               minVariantPrice {
//                 amount
//                 currencyCode
//               }
//             }
//             variants {
//               id
//               compareAtPriceV2 {
//                 amount
//                 currencyCode
//               }
//               priceV2 {
//                 amount
//                 currencyCode
//               }
//               shopifyId
//               selectedOptions {
//                 name
//                 value
//               }
//             }
//           }
//         }
//       }
//     }
//   `)

//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  // result.data.allShopifyProduct.edges.forEach(({ node }) => {
  //   createPage({
  //     path: `/product/${node.handle}`,
  //     component: path.resolve(`./src/templates/product.js`),
  //     context: {
  //       product: node,
  //     },

  // result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //   createPage({
  //     path: node.frontmatter.slug,
  //     component: blogPostTemplate,
  //     context: {
  //       // additional data can be passed via context
  //       slug: node.frontmatter.slug,
  //     },

  //   })
  // })
//}
