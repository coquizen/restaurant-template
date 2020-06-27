import React, { useState, useContext } from "react"
import styled from "styled-components"
import {
  ProductsProvider,
  ProductsContext,
} from "../components/productprovider"

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
    .Product {
      border: 1px solid #eee;
      margin: 1rem 0;
      padding: 1rem;
    }

    @media (min-width: 800px) {
      .Product {
        margin: 0 1rem;
        width: 33.3333%;
      }
    }

    .Product-title {
      font-size: 16px;
    }

    .Product-price {
      margin-bottom: 1rem;
    }

    .Product-buy-button {
      display: inline-block;
      margin: 0 0 1rem 0;
      padding: 0.85em 1em;
      border: 0;
      outline: 0;
      border-radius: 100em;
      font-size: 0.9rem;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      background-color: #61dafb;
      color: #fff;
      cursor: pointer;
      transition-property: backgroun
      d-color, color;
      transition-duration: 0.25s;
      transition-timing-function: ease-out;
      -webkit-appearance: none;
    }

    .Product-buy-button:hover,
    .Product-buy-button:focus {
      background-color: #47b8d7;
    }

  }
`
const MenuComponent = () => {
  const { products } = useContext(ProductsContext)

  console.log(`We are here in menucomponent: ${Object.keys(products)}`)
  const categories = [...new Set(products.map(item => item.menu))]
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [buttonActive, setButtonActive] = useState(null)

  const selected = e => {
    setButtonActive(e.target.id)
  }

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
        {products
          .filter(item => item.menu === currentCategory)
          .map(data => (
            <div className="Product" key={data.id}>
              <div className="Product_title">
                <p>{data.name}</p>
              </div>
              <div className="Product_price">
                <p>{data.price}</p>
              </div>
              <div className="card_body">
                <p>{data.description}</p>
              </div>
              <button className="Product_buy_button">Add to Cart</button>
            </div>
          ))}
      </div>
    </MenuStyles>
  )
}

export default MenuComponent
