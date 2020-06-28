import React, { useState, useEffect, createContext } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

export const ProductsContext = createContext()

/**
 * Wrapper to give Provider access to Sku nodes from Gatsby's GraphQL store.
 */
const ProductsProvider = ({ children }) => (
  <StaticQuery
    query={priceQuery}
    render={data => <Provider data={data}>{children}</Provider>}
  />
)

ProductsProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

/**
  Shares product information and availability through context.
  Products are first loaded from Gatsby's GraphQL store and then updated with
  current information from Stripe.
*/
const Provider = ({ data, children }) => {
  /** Load product data from Gatsby store */
  const initialDishes = processGatsbyData(data.allStripePrice.edges)
  const [dishes, setDishes] = useState(initialDishes)

  /** On render and update, update products with live data */
  // useEffect(() => {
  //   updateProducts()
  // }, [])

  /** Query live data from Stripe and update products */
  // const updateProducts = async () => {
  //   const { body, error } = await fetch("/.netlify/functions/productList")
  //     .then(response => response.json())
  //     .catch(error => console.error(error))

  //   if (error) {
  //     console.error(error)
  //     return
  //   }
  //   console.log(`Products provider: ${data}`)
  //   setDishes(data)
  //   // const liveProducts = processStripeData(data, dishes)
  //   // setDishes(liveProducts)
  // }

  return (
    <ProductsContext.Provider
      value={{
        products: dishes,
        listProducts: sort => {
          const fn = sort || ((a, b) => b.menu - a.menu)
          return Object.values(dishes).sort(fn)
        },
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

Provider.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
}

/** Normalize structure of data sourced from Gatsby's GraphQL store */
const processGatsbyData = data => {
  var sanitizedData = {}
  let section
  data.map(nodes => {
    const { node } = nodes
    if ((`${node.product.metadata.section}`) === undefined) {
      section = null
    } else {
      section = `${node.product.metadata.section}`
    }
    sanitizedData[node.product.id] = {
      id: node.product.id,
      name: node.product.name,
      description: node.product.description && `${node.product.description}`,
      price:  node.unit_amount_decimal && `${node.unit_amount_decimal / 100}`,
      menu: node.product.metadata.menu && `${node.product.metadata.menu}`,
      section
    }
  })
  return sanitizedData
}

// /** Normalize structure of live data sourced from Stripe */
// const processStripeData = (stripeData, products) => {
//   const liveProducts = {}
//   const liveSkus = {}
//   stripeData.forEach(stripeSku => {
//     const { id } = stripeSku.product
//     const gatsbySku = products[id].skus.find(x => x.id === stripeSku.id)
//     const updatedSku = Object.assign(stripeSku, gatsbySku)
//     updatedSku.name = generateSkuName(updatedSku)
//     if (!liveProducts[id]) {
//       stripeSku.product.slug = products[id].slug
//       liveProducts[id] = { ...stripeSku.product, skus: [] }
//     }
//     liveProducts[id].skus.push(updatedSku)
//     liveSkus[updatedSku.id] = updatedSku
//   })
//   return [liveProducts, liveSkus]
// }

export const priceQuery = graphql`
  query {
    allStripePrice {
      edges {
        node {
          product {
            id
            name
            description
            metadata {
              menu
              section
            }
          }
          unit_amount_decimal
          currency
        }
      }
    }
  }
`

export default ProductsProvider
