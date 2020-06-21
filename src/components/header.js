import PropTypes from "prop-types"
import React, { useState, Fragment } from "react"
import styled from "styled-components"
import { ReactSVG } from "react-svg"
import { Link } from "gatsby"

import HamburgerIcon from "../images/hamburger.svg"

const HeaderStyles = styled.header`
  min-width: 100%;
  color: #fff;
  background: transparent;
  margin-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  position: absolute;
  z-index: 150;
  vertical-align: middle;
  a {
    color: #fff;
    text-decoration: none;
  }
`

const HeaderMenuStyles = styled.div`
  position: fixed;
  min-width: 100%;
  z-index: 150;
  min-height: 100vh;
  height: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => (props.open ? "visible" : "hidden")};
  opacity: ${props => (props.open ? 1 : 0)};
  transition: visibility 0.5s, opacity 0.5s linear;

  .close-btn {
    position: absolute;
    align-self: flex-start;
    right: 0;
    margin-right: 24px;
    margin-top: 24px;
  }
  ul {
    list-style: none;
    text-align: center;
    margin: auto;
    li {
      font-family: "Poppins", Arial, sans-serif;
      font-size: 26px;
      margin-bottom: 26px;

      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
`
const Header = ({ siteTitle }) => {
  const [menuToggle, setMenuToggle] = useState(false)

  return (
    <Fragment>
      <HeaderStyles>
        <Link to="/">
          <h4>Restaurant Name</h4>
        </Link>
        <img
          src={HamburgerIcon}
          onClick={() => {
            console.log(menuToggle, "this")
            setMenuToggle(!menuToggle)
          }}
        ></img>
      </HeaderStyles>

      <HeaderMenu
        onClose={() => setMenuToggle(!menuToggle)}
        open={menuToggle}
      />
    </Fragment>
  )
}

var HeaderMenu = props => {
  const navMenuItems = [
    { text: "Home", link: "/" },
    { text: "Menu", link: "/menu" },
    {
      text: "About",
      link: "/about",
    },
  ]
  return (
    <HeaderMenuStyles open={props.open}>
      <h2 className="close-btn" onClick={props.onClose}>
        X
      </h2>
      <ul>
        {navMenuItems.map((menuItem, index) => {
          return (
            <li onClick={props.onClose} key={index}>
              <Link to={menuItem.link}>{menuItem.text}</Link>
            </li>
          )
        })}
      </ul>
    </HeaderMenuStyles>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
