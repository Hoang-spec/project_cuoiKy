import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CartProvider } from "./Components/CartContext";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/login";
import SignUp from "./Components/SingIn";
import Des from "./Components/Des";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import anh from "./images/Untitled-Photoroom.png"
import Admin from "./Components/Admin";
function App() {

  return (
    <CartProvider>
      <Router>
        <div div className="TONG">
          <nav className="nav">
            <div className="nav_logo">
              <img src={anh}/>
            </div>
            <div className="nav_links">
              <Link to="/" className="nav_link">
                Home
              </Link>
              <a>Laptop</a>
              <a>Television</a>
              <a>SmartPhone</a>
              <Link to="/cart" className="nav_cart">
                Cart
              </Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/des/:products_id/product_child/:product_id" element={<Des />} />
            <Route path="/SignIn" element={<SignUp />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/Admin" element={<Admin/>}/>

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
