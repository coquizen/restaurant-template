import React, { useState, useEffect } from "react"
import styled from "styled-components"

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
  .container {
    cursor: pointer;
    position: relative;
    &:hover {
      border-style: outset;
      border-width: 1px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.48s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  .container-counter,
  .container-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .container-overlay {
    z-index: 10;
  }
  .container-ordered {
    border-style: inset;
    border-width: 1px;
    box-shadow: 0 -2px -2px 0 rgba(0, 0, 0, 0.14),
      0 -1px -5px 0 rgba(0, 0, 0, 0.12), 0 -3px -1px 2px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.48s cubic-bezier(0.4, 0, 0.2, 1);
  }
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
      margin: 16px 0 6px 0;
      font-size: 16px;
      font-weight: 700;
    }
    .description {
      color: #7d7d7d;
      font-size: 14px;
      margin-bottom: 1em;
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
    .cards-list {
      z-index: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .card {
      cursor: pointer;
      background-color: #92a8d1;
      margin: 30px auto;
      width: 450px;
      height: 300px;
      border-radius: 40px;
      box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
        -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
      transition: 0.4s;
      .card_container {
        width: inherit;
        height: inherit;
        order-radius: 40px;
        cursor: pointer;
    }
    .card_title {
        text-align: center;
        border-radius: 0px 0px 40px 40px;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 30px;
        margin-top: -80px;
        height: 40px;
    }
    .card_price {
        text-align: center;
        border-radius: 0px 0px 40px 40px;
        font-family: sans-serif;
        font-weight: italic;
        font-size: 25px;
        margin-top: -80px;
        height: 35px;
    }
    .card_body {
      text-align: center;
      border-radius: 0px 0px 40px 40px;
      font-family: sans-serif;
      font-weight: normal;
      font-size: 20px;
      margin-top: -80px;
      height: 30px;
    }
    :hover {
      transform: scale(0.9, 0.9);
      box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
        -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
    }
    }

    .title-white {
      color: white;
    }

    .title-black {
      color: black;
    }

    @media all and (max-width: 500px) {
      .card-list {
        /* On small screens, we are no longer using row direction but column */
        flex-direction: column;
      }
    }
  }
`
const MenuComponent = props => {
  const categories = [...new Set(props.data.map(item => item.menu))]
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [cart, setCart] = useState(stripeSchema)
  const [buttonActive, setButtonActive] = useState(null)

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

  const selected = e => {
    setButtonActive(e.target.id)
  }

  const checkout = () => {}
  return (
    <MenuStyles>
      <div className="menu-title-block">
        <h2 className="menu-title">Our Delicious Menu</h2>
        <p>
          You have to enjoy the best food that money can buy all over the world
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
      <div className="cards-list">
        {props.data
          .filter(item => item.menu === currentCategory)
          .map(data => {
            return (
              <div className="card">
                {/* <div className="card_container"> */}
                <div className="card_title">
                  <p>{data.name}</p>
                </div>
                <div className="card_price">
                  <p>{data.price}</p>
                </div>
                <div className="card_body">
                  <p>{data.description}</p>
                </div>
                {/* </div> */}
              </div>
            )
          })}
      </div>
    </MenuStyles>
  )
}

export default MenuComponent
