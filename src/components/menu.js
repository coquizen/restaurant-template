import React, { useState } from "react"
import styled from "styled-components"

const menuData = [
  {
    price: "$25.99",
    name: "Grilled Beef with potatoes",
    description: "Meat / Potatoes / Rice / Tomatoes",
  },
  {
    price: "$25.99",
    name: "Grilled Beef with potatoes",
    description: "Meat / Potatoes / Rice / Tomatoes",
  },
  {
    price: "$25.99",
    name: "Grilled Beef with potatoes",
    description: "Meat / Potatoes / Rice / Tomatoes",
  },
  {
    price: "$25.99",
    name: "Grilled Beef with potatoes",
    description: "Meat / Potatoes / Rice / Tomatoes",
  },
]
const categories = [
  {
    title: "Main",
    items: menuData,
  },
  {
    title: "Desserts",
    items: [menuData[0]],
  },
  {
    title: "Drinks",
    items: menuData,
  },
]
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
const MenuComponent = () => {
  const [currentCategory, setCurrentCategory] = useState(categories[0])

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
            return (
              <li
                key={index}
                className={
                  currentCategory.title === category.title ? "active" : ""
                }
              >
                <a
                  href={`#${category.title}`}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentCategory(category)
                  }}
                >
                  {category.title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="menu-items-block">
        {currentCategory.items.map((data, index) => {
          return (
            <div className="menu-item" key={index}>
              <p className="price">{data.price}</p>
              <p className="name">{data.name}</p>
              <p className="description">{data.description}</p>
            </div>
          )
        })}
      </div>
    </MenuStyles>
  )
}

export default MenuComponent
