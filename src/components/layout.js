import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import Footer from "./footer"
import CartProvider from "./cartprovider"
import ProductsProvider from "./productprovider"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ProductsProvider>
        <CartProvider>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              // maxWidth: 960,
              // padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0,
              minHeight: "100%",
            }}
          >
            <main>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </ProductsProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
