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
const Menu = () => {
  return (
    <Layout>
      <MenuPage>
        <section className="menu-cover">
          <img alt="table with food" className="menu-cover-img" src={menuCover}></img>
        </section>
        <MenuComponent />
      </MenuPage>
    </Layout>
  )
}

export default Menu
