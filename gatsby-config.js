const path = require(`path`)
require("dotenv").config({
  path: `.env`,
})

module.exports = {
  /* Your site config here */
plugins: [

{
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/src/markdown-pages`,
    },
  },

{
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/markdown-pages`,
      name: `markdown-pages`,
    },
  },
  `gatsby-transformer-remark`,

  /*
   * Gatsby's data processing layer begins with “source”
   * plugins. Here the site sources its data from Shopify.
   */
  {
    resolve: "gatsby-source-shopify",
    options: {
      // The domain name of your Shopify shop. This is required.
      // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
      // 'gatsby-source-shopify-test-shop.myshopify.com'.
      // If you are running your shop on a custom domain, you need to use that
      // as the shop name, without a trailing slash, for example:
      // shopName: "gatsby-shop.com",
      shopName: "MyStore111147",

      // An API access token to your Shopify shop. This is required.
      // You can generate an access token in the "Manage private apps" section
      // of your shop's Apps settings. In the Storefront API section, be sure
      // to select "Allow this app to access your storefront data using the
      // Storefront API".
      // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
      accessToken: "2c4f9e29042f1f1f97a87f358a3e3c77",

      // Set the API version you want to use. For a list of available API versions,
      // see: https://help.shopify.com/en/api/storefront-api/reference/queryroot
      // Defaults to 2019-07
      apiVersion: "2020-07",

      // Set verbose to true to display a verbose output on `npm run develop`
      // or `npm run build`. This prints which nodes are being fetched and how
      // much time was required to fetch and process the data.
      // Defaults to true.
      verbose: true,

      // Number of records to fetch on each request when building the cache
      // at startup. If your application encounters timeout errors during
      // startup, try decreasing this number.
      paginationSize: 250,

      // List of collections you want to fetch.
      // Possible values are: 'shop' and 'content'.
      // Defaults to ['shop', 'content'].
      includeCollections: ["shop", "content"],

      // Allow overriding the default queries
      // This allows you to include/exclude extra fields when sourcing nodes
      // Available keys are: articles, blogs, collections, products, shopPolicies, and pages
      // Queries need to accept arguments for first and after
      // You will need to include all the fields you want available for a
      // specific key. View the `shopifyQueries Defaults` section below for a
      // full list of keys and fields.
      shopifyQueries: {
        products: `
          query GetProducts($first: Int!, $after: String) {
            products(first: $first, after: $after) {
              pageInfo {
                hasNextPage
              }
              edges {
                cursor
                node {
                  availableForSale
                }
              }
            }
          }
        `,
      },shopifyQueries: {
  articles: `
    query GetArticles($first: Int!, $after: String) {
      articles(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            author {
              bio
              email
              firstName
              lastName
              name
            }
            blog {
              id
            }
            comments(first: 250) {
              edges {
                node {
                  author {
                    email
                    name
                  }
                  content
                  contentHtml
                  id
                }
              }
            }
            content
            contentHtml
            excerpt
            excerptHtml
            id
            handle
            image {
              altText
              id
              src
            }
            publishedAt
            tags
            title
            url
            seo {
              title
              description
            }
          }
        }
      }
    }
  `,
  blogs: `
    query GetBlogs($first: Int!, $after: String) {
      blogs(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            url
          }
        }
      }
    }
  `,
  collections: `
    query GetCollections($first: Int!, $after: String) {
      collections(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            description
            descriptionHtml
            handle
            id
            image {
              altText
              id
              src
            }
            products(first: 250) {
              edges {
                node {
                  id
                }
              }
            }
            title
            updatedAt
          }
        }
      }
    }
  `,
  products: `
    query GetProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            availableForSale
            createdAt
            description
            descriptionHtml
            handle
            id
            images(first: 250) {
              edges {
                node {
                  id
                  altText
                  originalSrc
                }
              }
            }
            metafields(first: 250) {
              edges {
                node {
                  description
                  id
                  key
                  namespace
                  value
                  valueType
                }
              }
            }
            onlineStoreUrl
            options {
              id
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            productType
            publishedAt
            tags
            title
            updatedAt
            variants(first: 250) {
              edges {
                node {
                  availableForSale
                  compareAtPrice
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  id
                  image {
                    altText
                    id
                    originalSrc
                  }
                  metafields(first: 250) {
                    edges {
                      node {
                        description
                        id
                        key
                        namespace
                        value
                        valueType
                      }
                    }
                  }
                  price
                  priceV2 {
                    amount
                    currencyCode
                  }
                  requiresShipping
                  selectedOptions {
                    name
                    value
                  }
                  sku
                  title
                  weight
                  weightUnit
                  presentmentPrices(first: 250) {
                    edges {
                      node {
                        price {
                          amount
                          currencyCode
                        }
                        compareAtPrice {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
            vendor
          }
        }
      }
    }
  `,
  shopPolicies: `
    query GetPolicies {
      shop {
        privacyPolicy {
          body
          id
          title
          url
        }
        refundPolicy {
          body
          id
          title
          url
        }
        termsOfService {
          body
          id
          title
          url
        }
      }
    }
  `,
  pages: `
    query GetPages($first: Int!, $after: String) {
      pages(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            body
            bodySummary
            updatedAt
            url
          }
        }
      }
    }
  `,
},
    },
  },
],
}
