import React from "react"
import MenuComponent from "../components/menu"
import Layout from "../components/layout"
import menuCover from "../images/menucover.jpg"
import styled from "styled-components"
import { graphql } from 'gatsby'

const MenuPage = styled.div`
  .menu-cover {
    height: 400px;
    max-height: 100%;
    ::before {
      content: "";
      z-index: 100;
      position: absolute;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      height: 400px;
      width: 100%;
    }
    .menu-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const menuData = {
  data: {
    allStripePrice: {
      edges: [
        {
          node: {
            product: {
              id: "prod_HX3vxAh3hx1mqM",
              name: "Truffle Fries",
              description: "truffle oil, salt, pepper",
              metadata: {
                menu: "dinner",
                section: "little plates",
              },
            },
            unit_amount_decimal: "500",
            currency: "usd",
          },
        },
        {
          node: {
            product: {
              id: "prod_HX1j39wpJAfs3C",
              name: "Spicy Shrimp Scampi",
              description: "garlic, chili, herbs, focaccia",
              metadata: {
                menu: "dinner",
                section: "little plates",
              },
            },
            unit_amount_decimal: "2000",
            currency: "usd",
          },
        },
        {
          node: {
            product: {
              id: "prod_HX1VvyzfT1uttk",
              name: "Greek's Salad",
              description: null,
              metadata: {
                menu: "salads",
                section: "small plates",
              },
            },
            unit_amount_decimal: "1000",
            currency: "usd",
          },
        },
        {
          node: {
            product: {
              id: "prod_HX1V0tioG1Owdz",
              name: "Chef's Salad",
              description: null,
              metadata: {
                menu: "dinner",
                section: "salad",
              },
            },
            unit_amount_decimal: "1100",
            currency: "usd",
          },
        },
      ],
    },
  },
}

const sanitize = data => {
  var sanitizedData = []
  console.log(data)
  data.map(nodes => {
    const { node } = nodes
    sanitizedData.push({
      id: node.product.id,
      name: node.product.name,
      description: node.product.description,
      price: node.unit_amount_decimal / 100,
      menu: `${node.product.metadata.menu}`,
      section: `${node.product.metadata.section}`,
    })
  })

  return sanitizedData
}

const Menu = ({ data }) => {
  const sanitizedData = sanitize(data.allStripePrice.edges)
  return (
    <Layout>
      <MenuPage>
        <section className="menu-cover">
          <img
            alt="table with food"
            className="menu-cover-img"
            src={menuCover}
          ></img>
        </section>
        <MenuComponent data={sanitizedData} />
      </MenuPage>
    </Layout>
  )
}

export const query = graphql`
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
export default Menu
