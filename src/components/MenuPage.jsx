import React, { useState, useEffect } from 'react';

// Define prices and image URLs with categories for each item
const prices = {
  'Vegetable Kung Pao': { price: 915.17, imageUrl: 'https://imgs.search.brave.com/dP_2nPULz94e-bkxBsuxAwWeDknQnUWwyTG3g4MsuoU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbGFu/dGJhc2Vkb25hYnVk/Z2V0LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wNS9W/ZWctS3VuZy1QYW8t/UEJPQUItUGxhbnQt/QmFzZWQtb24tYS1C/dWRnZXQtMTEuanBn', category: 'chinese' },
  'Vegetable Fried Rice': { price: 747.17, imageUrl: 'https://imgs.search.brave.com/30eQGV_L3004C_cc8H0jhG5Cjq_YNUNqWJDfqP12HBI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFuaGVhbHRo/eXJlY2lwZXMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIw/LzEyL2ZyaWVkLXJp/Y2Uud2VicA', category: 'chinese' },
  'Vegetable Tacos': { price: 290.50, imageUrl: 'https://imgs.search.brave.com/N6KzMqrXkT6izEInFZyJjwsQwfCm_U5T_NxnykgLQ7c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHdvcGVhc2FuZHRo/ZWlycG9kLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/Ni9WZWdnaWUtVGFj/b3M0NTgwLTY1MHg5/NzUuanBn', category: 'street' },
  'Vegetable Samosas': { price: 414.17, imageUrl: 'https://imgs.search.brave.com/q2xTmEzoUNBfMrkWqOr4cDc1e79XRKMOxnR1dA9kj7w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2l0Y2hlbnNhbmN0/dWFyeS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjMvMTEv/U2Ftb3NhLXRhbGwt/MS5qcGc', category: 'indian' },
  'Vegetable Margherita Pizza': { price: 1078.17, imageUrl: 'https://imgs.search.brave.com/IJsKbUPfl7_N3-xGXL5CcjHyN_-5J2CCr-t0HVtb64s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaW1tZWRpYXRl/LmNvLnVrL3Byb2R1/Y3Rpb24vdm9sYXRp/bGUvc2l0ZXMvMzAv/MjAyMC8wOC92ZWdh/bi1waXp6YS02NzEy/NWQ2LmpwZz9xdWFs/aXR5PTkwJnJlc2l6/ZT00NDAsNDAw', category: 'italian' },
  'Chocolate Lava Cake': { price: 581.17, imageUrl: 'https://imgs.search.brave.com/bWQ808Uj9FC0YGVaKgva82Pjdc0rjm_WiOngh7JKTlU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmFrZWRieWFuaW50/cm92ZXJ0LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/NC9MYXZhLUNha2Ut/OC5qcGc', category: 'desserts' },
  'Vegetable Biryani': { price: 496.17, imageUrl: 'https://imgs.search.brave.com/T3w68KrpITW7zEEhf5bnqqy0ZC78-hBBMooKX-GhHEU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzU5Lzc1LzAz/LzM2MF9GXzg1OTc1/MDMxNF9HWmtRdGVT/eXcwNjFWeEVuQVNy/VWN2dHdYSU11VEx1/SS5qcGc', category: 'indian' },
  'Vegetable Ramen': { price: 829.17, imageUrl: 'https://imgs.search.brave.com/04tHPmcwHf_X3DsqBlSU9Ytvso4scpf-DMI7IMoBAe0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wZWFz/YW5kY3JheW9ucy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMDQvc3BpY3kt/dmVnZXRhcmlhbi1y/YW1lbi1yZWNpcGUt/NS5qcGc', category: 'japanese' }
};

const FoodOffers = () => {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const changeQuantity = (item, delta) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (!(item in newCart)) newCart[item] = 0;
      newCart[item] = Math.max(newCart[item] + delta, 0);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const getItemPrice = (item) => prices[item]?.price || 0;

  const calculateTotal = () => {
    let total = 0;
    for (let item in cart) {
      if (cart[item] > 0) {
        let itemTotal = cart[item] * getItemPrice(item);
        if (item === 'Vegetable Kung Pao') {
          const paidItems = Math.ceil(cart[item] / 2);
          itemTotal = paidItems * getItemPrice(item);
        }
        total += itemTotal;
      }
    }
    return total.toFixed(2);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const clearCart = () => {
    setCart({});
    localStorage.removeItem('cart');
    alert('Cart has been cleared!');
  };

  const filterItems = (category) => {
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      item.style.display = (category === 'all' || itemCategory === category) ? 'block' : 'none';
    });
  };

  const loadCartFromStorage = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) setCart(savedCart);
  };

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  return (
    <div className="container mt-5">
      <h1>MENU</h1>

      <div className="text-center my-4">
        <button className="btn filter-btn" onClick={() => filterItems('all')}>All</button>
        <button className="btn filter-btn" onClick={() => filterItems('indian')}>Indian</button>
        <button className="btn filter-btn" onClick={() => filterItems('chinese')}>Chinese</button>
        <button className="btn filter-btn" onClick={() => filterItems('street')}>Street Food</button>
        <button className="btn filter-btn" onClick={() => filterItems('italian')}>Italian</button>
        <button className="btn filter-btn" onClick={() => filterItems('desserts')}>Desserts</button>
        <button className="btn filter-btn" onClick={() => filterItems('japanese')}>Japanese</button>
      </div>

      <div id="food-items" className="row">
        {Object.keys(prices).map((item, index) => (
          <div className="col-md-4 food-item" key={index} data-category={prices[item].category}>
            <div className="card">
              <img src={prices[item].imageUrl} className="card-img-top" alt={item} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <div className="card-title">
                  <span>{item}</span>
                  <div className="quantity-controls">
                    <button className="btn btn-secondary" onClick={() => changeQuantity(item, -1)}>-</button>
                    <span className="quantity">{cart[item] || 0}</span>
                    <button className="btn btn-secondary" onClick={() => changeQuantity(item, 1)}>+</button>
                  </div>
                </div>
                <p className="card-text">Price: ₹{prices[item].price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="cart-icon" onClick={toggleCart} style={{ position: 'fixed', top: 20, right: 20, cursor: 'pointer', fontSize: 24, color: '#ffcc00' }}>🛒</div>
      <div id="cart-sidebar" style={{ right: isCartOpen ? 0 : '-300px' }}>
        <h4>Shopping Cart</h4>
        <div id="cart-content">
          <ul className="list-group">
            {Object.keys(cart).map(item => (
              cart[item] > 0 && (
                <li key={item} className="list-group-item">
                  {item} - {cart[item]} x ₹{prices[item].price.toFixed(2)} = ₹{(cart[item] * prices[item].price).toFixed(2)}
                </li>
              )
            ))}
          </ul>
          <h4>Total: ₹{calculateTotal()}</h4>
          <button className="btn btn-primary" onClick={() => alert('Thank you for your order!')}>Order Now</button>
          <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodOffers;
