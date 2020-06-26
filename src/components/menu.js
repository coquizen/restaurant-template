import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from 'gatsby'

const stripeSchema = [
  {
    id: "",
    name: "",
    menu: "",
    section: "",
    description: "",
    price: "",
  },
]

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
// const categories = Object.keys(menuData)

const MenuStyles = styled.div`
  min-height: 100vh;
  padding-top: 40px;
  color: #404044;
  .menu-title-block {
    text-align: center;
    .menu-title {
      font-family: Lora;
    }
    p {
      color: #7d7d7d;
    }
  }

  .menu-item {
    .price {
      font-size: 24px;
      color: #404044;
      font-family: "Lora", Georgia, serif;
      margin: 0px;
    }
    .name {
      margin: 10px 0 10px 0;
      font-size: 16px;
      font-weight: 700;
    }
    .description {
      color: #7d7d7d;
      font-size: 14px;
      margin-bottom: 1.5em;
      font-weight: 400;
      font-family: "Poppins", Arial, sans-serif;
    }
  }

  .menu-items-block {
    max-width: 800px;
    margin: 15px auto;
    .menu-item {
      max-width: 300px;
      margin: auto;
    }
    @media (min-width: 1025px) {
      display: grid;
      grid-template-columns: 50% 50%;
    }
  }

  .menu-category {
    margin: auto;
    max-width: 800px;
    text-align: center;
    ul {
      margin: auto;
      li {
        list-style: none;
        display: inline-block;
        margin: 20px;
        position: relative;
        a,
        a:visited {
          text-decoration: none;
          color: #404044 !important;
        }
      }

      li.active a:after {
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        content: "";
        width: 100%;
        height: 2px;
        background: #ff6107;
        margin: 0 auto;
      }
    }
  }
`
const MenuComponent = props => {
  const categories = [...new Set(props.data.map(item => item.menu))]
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [cart, setCart] = useState(stripeSchema)

    const addToCart = (e, datum) => {
      const product = {
        id: datum.name,
        currency: "USD",
        price: datum.price,
        attributes: {
          name: datum.name,
        },
        quantity: 1,
      }

      setCart([...cart, product])
    }

    const checkout = () => {}
    return (
      <MenuStyles>
        <div className="menu-title-block">
          <h2 className="menu-title">Our Delicious Menu</h2>
          <p>
            You have to enjoy the best food that money can buy all over the
            world
          </p>
        </div>
        <div className="menu-category">
          <ul>
            {categories.map((category, index) => {
              console.log(
                `category: ${category}, currentCategory: ${currentCategory}`
              )
              return (
                <li
                  key={index}
                  className={currentCategory === category ? "active" : ""}
                >
                  <a
                    href={`#${category}`}
                    onClick={e => {
                      e.preventDefault()
                      setCurrentCategory(category)
                    }}
                  >
                    {category}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="menu-items-block">
          {props.data
            .filter(item => item.menu === currentCategory)
            .map((data, index) => {
              return (
                <div className="menu-item" key={index}>
                  <p className="price">${data.price}</p>
                  <p className="name">{data.name}</p>
                  <p className="description">{data.description}</p>
                  <button onClick={e => addToCart(e, data)}>add to cart</button>
                </div>
              )
            })}
        </div>
      </MenuStyles>
    )
}

export default MenuComponent
