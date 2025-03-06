import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Main Content Section */}
      <div className="main_slide">
        <div>
          <h1>Enjoy <span>Delicious Food</span> in Your Healthy Life</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam magni dolores provident accusamus hic architecto...</p>
          <Link to="/login">
            <button className="red_btn">Visit Now <i className="fa-solid fa-arrow-right-long"></i></button>
          </Link>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-photo/top-view-vegetable-pate-rolls-with-tomatoes-french-fries-inside-plate-white-surface_179666-35644.jpg"
            alt="Delicious food"
          />
        </div>
      </div>

      {/* Food Items Section */}
      <div className="food-items">
        <div className="item">
          <div>
            <img
              src="https://www.thespruceeats.com/thmb/hqqNrNhIpqPqV2u0T0K-IUzUsEo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-cuisine-of-north-india-1957883-d32a933f506d43f59ac38a8eb956884a.jpg"
              alt="Indian Cuisine"
            />
          </div>
          <h3>Indian</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nihil?</p>
          <button className="white_btn">See Menu</button>
        </div>
        <div className="item">
          <div>
            <img
              src="https://assets.zeezest.com/blogs/PROD_Banner_1663162846668.jpg"
              alt="Chinese Cuisine"
            />
          </div>
          <h3>Chinese</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nihil?</p>
          <button className="red_btn">See Menu</button>
        </div>
        <div className="item">
          <div>
            <img
              src="https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/08/Top-Italian-Dishes-Fettuccine-al-Pomodoro.jpg"
              alt="Italian Cuisine"
            />
          </div>
          <h3>Italian</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nihil?</p>
          <button className="white_btn">See Menu</button>
        </div>
      </div>

      {/* New "See Menu" Button Section */}
      <div className="see-menu-btn">
        <h2>Ready to Order?</h2>
        <p>Browse through our full menu and order your favorite dishes now!</p>
        
        {/* <a href="" className='red_btn'> see Menu</a> */}
      </div>

      {/* Why People Choose Us Section */}
      <div className="main_slide2">
        <div className="fooding">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRIo_rhWkJoR7Tlt5tOdhTr8EyEjDVBLCQ-g&s"
            alt="Fooding"
          />
        </div>
        <div className="question">
          <h2>Why People Choose Us?</h2>
          <div className="q-ans">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzxOvve495ED7buFewof1H6_xwRSTlEyQ_QQ&s"
                alt="Choose Your Favourite"
              />
            </div>
            <div>
              <h4>Choose Your Favourite</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className="q-ans">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGCWRAS78kPzwtma4WFjxvLAvagtfJ6n3hYg&s"
                alt="Fast Delivery"
              />
            </div>
            <div>
              <h4>Fast Delivery</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offer Section */}
      <div className="main_slide3">
        <div className="special-offer">
          <h2>Special Offer</h2>
          <div className="offer-items">
            <div className="item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5v8XfGntzqbrF2eR9IzrcmioR0V4_0z9APYtQ"
                alt="Mango Lassi"
              />
              <h3>Mango Lassi</h3>
              <p>A refreshing and creamy yogurt drink with ripe mangoes.</p>
              <p className="fav-price">80 Rs</p>
            </div>
            <div className="item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLK4ok3unxepdlWf0H3rrpu1CUelfHOQyKPw&s"
                alt="Gulab Jamun"
              />
              <h3>Gulab Jamun</h3>
              <p>Traditional Indian dessert soaked in a sweet syrup.</p>
              <p className="fav-price">70 Rs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Feedback Section */}
      <div className="main_slide4">
        <div className="chef-feed">
          <h2>Customer Feedback</h2>
          <p>"One of the best dining experiences I've had. The flavors are fantastic, and the service is impeccable!"</p>
          <div className="chef-detail">
            <img
              src="https://cdn.vectorstock.com/i/500p/13/88/restaurant-icon-vector-381388.jpg"
              alt="Chef"
            />
            <div>
              <h6>Prince Devil</h6>
              <p>Ethical Hacker</p>
            </div>
          </div>
          <div className="chef-vic">
            <div>
              <i className="fa-solid fa-hand-peace"></i>
              <h4>68</h4>
              <p>Votes</p>
            </div>
            <div>
              <i className="fa-solid fa-trophy"></i>
              <h4>956</h4>
              <p>Achievements</p>
            </div>
          </div>
        </div>
        <div className="chef">
          <img
            src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-cute-little-boy-chef-holding-a-silver-tray-png-image_6021308.png"
            alt="Chef"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-1">
          <div className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMT6pLh_HGtjX0m6T3wCYb51HCJhAbcBqdRA&s"
              alt="Official Logo"
            />
          </div>
          
          <div>
            <address>
              <a href="mailto:aadi0256.be23@chitkara.edu.in?subject=enquiry&body=please book a table for me">
                Click to send us a mail!!
              </a>
              <p>Mr. Restrooooo, <br /> Rajpura, Punjab, India</p>
            </address>
          </div>
        </div>
        <div className="contact-us">
          <h2 id="contact">Contact Us</h2>
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
