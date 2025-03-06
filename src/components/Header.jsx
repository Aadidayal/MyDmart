import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation

const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header>
      {/* Logo Section */}
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMT6pLh_HGtjX0m6T3wCYb51HCJhAbcBqdRA&s"
          alt="Restaurant logo"
          className="rotate"
        />
      </div>

      {/* Navigation Links */}
      <nav>
        <ul>
          {/* <li><a href="#">Home</a></li> */}
          <Link to="/Header">
          <button>Home</button>
        </Link>
          <li><a href="#contact">Contact us</a></li>
          {/* <li><a href="#">Food Menu</a></li> */}
          <li><a href="#">Book Table</a></li>
          <li>
          <Link to="/menu">
          <button>See Full Menu</button>
        </Link>
          </li>
        </ul>
      </nav>

      {/* Account Section */}
      <div className="account">
        <ul>
          <li><a href="#"><i className="fa-solid fa-house-chimney icon-golden"></i></a></li>
          <li><i className="fa-solid fa-magnifying-glass icon-golden" onClick={toggleSearch}></i></li>

          {/* Search Input */}
          {searchVisible && (
            <div className="search">
              <input type="search" placeholder="Search..." />
              <i className="fa-solid fa-magnifying-glass icon-golden"></i>
            </div>
          )}

          <li><a href="#"><i className="fa-solid fa-user icon-golden"></i></a></li>
        </ul>
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-bar">
        <i className="fa-solid fa-bars icon-golden"></i>
      </div>
    </header>
  );
};

export default Header;
