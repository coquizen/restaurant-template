import React from "react"
import MenuComponent from "../components/menu"
import Layout from "../components/layout"
import menuCover from "../images/menucover.jpg"
import styled from "styled-components"

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
const sanitize = data => {
  /*
  nodes [
    { node
      {
        product: {
          description
          id
          metadata {
            menu
            section
          }
          name
        }
        unit_amount_decimal
      }
    }
  ] 
  */
  var sanitizedData = [] 
  data.map((nodes) => {
    const { node } = nodes
    sanitizedData.push({
      id: node.product.id,
      name: node.product.name,
      description: node.product.description,
      price: (node.unit_amount_decimal / 100),
      menu: `${node.product.metadata.menu}`,
      section: `${node.product.metadata.section}`
    })
  })
  return sanitizedData  
}

const Menu = ({ data }) => {
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
        <MenuComponent data={sanitize(data.allStripePrice.edges)} />
      </MenuPage>
    </Layout>
  )
}

export const query = graphql`
  query products {
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
