import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Carousel } from 'react-bootstrap';
import './Home.css';
import { authContent } from '../store';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

import img from '../img/tv1.avif';
import img1 from '../img/sweatshirt.avif';
import img2 from '../img/tshrit.avif';
import img3 from '../img/ring.jpg';
// import img4 from '../img/all.jpg';

const Home = ({ searchTerm }) => {
  const { state, cart, setCart, wishlist, setWishlist } = useContext(authContent);
  const [filt, setFilt] = useState("all");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filtered = state.filter((item) => {
    const matchesCategory = filt === "all" || item.category === filt;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.item.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.item.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  const toggleWishlist = (item) => {
    const existingWishlistItem = wishlist.find((wishlistItem) => wishlistItem.id === item.id);
    if (existingWishlistItem) {
      setWishlist(wishlist.filter(wishlistItem => wishlistItem.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryClick = (category) => {
    setFilt(category);
  };

  return (
    <>
    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/Fashion/Event/Jupiter24/AF/Phase1/Bank/V1/Frame_20387_1-2.png" style={{width:'100%'}} alt="" />
    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Jupiter24/ACQ/T6/1page-1500x220_pc_1.jpg" alt="" />
      {/* Carousel for Offers */}
      <Carousel className="mb-4 mt-5">
        {/* Carousel Items */}
        <Carousel.Item>
          <img className="d-block w-100" src="https://glamwiz.com/cdn/shop/files/Desktop_Banner_1_1024x1024.jpg?v=1686758650" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://www.shutterstock.com/image-vector/sale-offers-discount-website-banner-260nw-2213365305.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://www.netrockdeals.com/blog/wp-content/uploads/2021/10/Upto-50-OFF-ON-LARGE-APPLIANCES-38000-Products.jpg" alt="Third slide" />
          <Carousel.Caption>
            <Link to="/">
              <Button variant="dark" className="show-now-button">Shop Now</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Offers Section */}
      <div className="offers-container">
        <h2 className="text-center mb-4">Today's Offers</h2>
        <div className="offers-grid">
          <div className="offer-card">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/18b95d7661113602.jpg?q=20" alt="Offer 1" className="offer-image" />
            <h3 className="offer-title">Up to 50% Off on Electronics</h3>
            <Link to="/electronics" className="offer-button">Shop Now</Link>
          </div>
          <div className="offer-card">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/a0ea8c94320fad9a.png?q=20" alt="Offer 2" className="offer-image" />
            <h3 className="offer-title">Exclusive Fashion Deals</h3>
            <Link to="/fashion" className="offer-button">Shop Now</Link>
          </div>
          <div className="offer-card">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/c4a73dc7a16d6ed7.jpg?q=20" alt="Offer 3" className="offer-image" />
            <h3 className="offer-title">Take Off & Save Up to 15-25% </h3>
            <Link to="/groceries" className="offer-button">Shop Now</Link>
          </div>
          <div className="offer-card">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/520/280/image/99afb9d82d2bf54c.jpg?q=20" alt="Offer 3" className="offer-image" />
            <h3 className="offer-title"> Off Up to 20-50% </h3>
            <Link to="/groceries" className="offer-button">Shop Now</Link>
          </div>
        </div>
      </div>

      <div className='container'>
  <h2 className="text-center mt-2 py-2 fs-1 fw-bold text-dark shadow-lg">Top Categories</h2>
</div>

<div className="categories-container d-flex justify-content-center flex-wrap mb-4">
  {/* Category Cards */}
  <div className="category-card m-3" onClick={() => handleCategoryClick("all")}>
    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img24/Jupiter24/Phase3/J24_GW_PC_CC_SAD_1x._SY304_CB545060597_.jpg" alt="All" className="category-img" />
    <div className="category-info">
      <div className="tag">All</div>
    </div>
  </div>
  <div className="category-card m-3" onClick={() => handleCategoryClick("electronics")}>
    <img src={img} alt="Electronics" className="category-img" />
    <div className="category-info">
      <div className="tag">Electronics</div>
    </div>
  </div>
  <div className="category-card m-3" onClick={() => handleCategoryClick("men's clothing")}>
    <img src="https://images.meesho.com/images/marketing/1692191045019_300.webp" alt="Men's Clothing" className="category-img" />
    <div className="category-info">
      <div className="tag">Men's Clothing</div>
    </div>
  </div>
  <div className="category-card m-3" onClick={() => handleCategoryClick("women's clothing")}>
    <img src='https://images.meesho.com/images/marketing/1701835320853_400.webp' alt="Women's Clothing" className="category-img" />
    <div className="category-info">
      <div className="tag">Women's Clothing</div>
    </div>
  </div>
  <div className="category-card m-3" onClick={() => handleCategoryClick("jewelery")}>
    <img src={img3} alt="Jewelry" className="category-img" />
    <div className="category-info">
      <div className="tag">Jewelry</div>
    </div>
  </div>
</div>


      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filtered.map((item) => (
          <div className="col" key={item.id}>
            <div className="card">
              <img src={item.image} className="card-img-top my-3" alt={item.title} height="150px" width="100px" style={{ objectFit: "contain" }} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  {expanded[item.id] ? item.description : item.description.slice(0, 100) + '...'}
                  <span onClick={() => toggleDescription(item.id)} className="toggle-description text-primary">
                    {expanded[item.id] ? ' Show less' : ' Read more'}
                  </span>
                </p>
                <p className="card-text fw-bold">Price: ₹{item.price}</p>
                <Button variant="primary" onClick={() => addCart(item)}>Add to Cart</Button>
                <FaHeart 
                    className={`wishlist-icon ms-2 ${wishlist.some(wishlistItem => wishlistItem.id === item.id) ? 'added' : ''}`} 
                    onClick={() => toggleWishlist(item)} 
                    style={{ cursor: 'pointer', fontSize: '20px', color: wishlist.some(wishlistItem => wishlistItem.id === item.id) ? 'red' : 'gray' }} 
                /> wishlist
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
