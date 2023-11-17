import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Nav = styled.div`
  background-color: #e40505;
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Align items to the right */
  padding: 10px; /* Add some padding for spacing */
`;

const CustomButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Comic Sans MS";
  width: 80px; /* Set an appropriate width for the button */
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: #fc8b9e;
  }
`;

function Navbar() {
  return (
    <Nav>
      <div>Navbar</div>

      <NavLinks>
        <NavLink to="/">home</NavLink>
        <NavLink to="/pokemon">pokemon</NavLink>
      
      </NavLinks>

      <CustomButton>home page</CustomButton>
    </Nav>
  );
}

export default Navbar;
