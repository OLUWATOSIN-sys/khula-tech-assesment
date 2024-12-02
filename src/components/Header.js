import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  font-family: Arial, sans-serif;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: auto;
    margin-right: 20px;
  }

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 20px;

    input {
      width: 300px;
      padding: 8px 40px 8px 12px; /* Adjust for dropdown icon */
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #28a745;
      }
    }

    select {
      position: absolute;
      right: 5px;
      border: none;
      background: none;
      font-size: 16px;
      color: #555;
      appearance: none; /* Remove default dropdown styles */
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }

  .nav-links {
    display: flex;
    gap: 15px;

    a {
      text-decoration: none;
      color: #333;
      font-size: 14px;

      &:hover {
        color: #28a745;
      }
    }
  }
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;

  .cart {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 14px;
    color: #333;

    i {
      font-size: 18px;
      color: #333;
      cursor: pointer;

      &:hover {
        color: #28a745;
      }
    }

    span {
      margin-left: 5px;
    }

    &::after {
      content: '1'; /* Example cart count */
      position: absolute;
      top: -10px; /* Adjusted to move above the text/icon */
      right: -19px; /* Adjusted to move slightly away from the icon */
      background-color: red;
      color: white;
      font-size: 12px;
      font-weight: bold;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10; /* Ensures it's above other elements */
    }
  }

  .logout {
    color: #333;
    font-size: 14px;
    margin-left: 20px;
    text-decoration: none;

    &:hover {
      color: #28a745;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      {/* Left Section: Logo, Search, and Navigation */}
      <LeftWrapper>
        <img src="https://www.khula.co.za/static/media/khula-logo-slogan.04bff781.svg" alt="Logo" />
        <div className="search-container">
          <input type="text" placeholder="Search Products" />
          <select>
            <option value="default">▼</option>
          </select>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">Quotes</a>
          <a href="/">Orders</a>
          <a href="/">Support</a>
          <a href="/">Account</a>
        </div>
      </LeftWrapper>

      {/* Right Section: Cart and Logout */}
      <RightWrapper>
        <div className="cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          <span>Cart</span>
        </div>
        <a className="logout" href="/logout">Logout</a>
      </RightWrapper>
    </HeaderWrapper>
  );
};

export default Header;
