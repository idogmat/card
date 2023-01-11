import React, {ReactElement} from 'react';
import styled from "styled-components";
import {HeaderLink} from "../components/Header/HeaderLink";
import {pageIcons} from "../components/Header/Header.data";
import {NavLink} from "react-router-dom";
import styles from "../components/Header/HeaderLink.module.css";
interface IHeaderLinkProps {
  icon?: ReactElement;
  page: string;
}
const NavMenuWrapper=styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  color: black;
  list-style: none;
  gap: 10px;
  font-size: 16px;
  padding: 5px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  z-index: 100;

  li {
    width: 100%;
    padding: 5px;
    z-index: 100;

    :hover {
      background-color: rgba(124, 78, 78, 0.15);
    }

    a {
      display: flex;
      margin: auto 0;
      width: 100%;
      justify-content: space-between;
    }
  }

  svg {
    margin: auto 0;
  }
}
`

const NavMenu = (props:any) => {
  const formattedPageName =(page:string)=> page[0].toUpperCase() + page.slice(1)
  return (
    <NavMenuWrapper>
      {props.authPages.map((page:string) =>
        <li><NavLink to={`/${page}`}>
          {pageIcons[page] && pageIcons[page]}
          {formattedPageName(page)}
        </NavLink></li>
      )}
      {props.isAuth && <li><NavLink to={`/logout` }>{pageIcons["logout"]} {formattedPageName("logout")} </NavLink></li>}
      {/*{props.children}<NavElement></NavElement>*/}
    </NavMenuWrapper>
  );
};

export default NavMenu;