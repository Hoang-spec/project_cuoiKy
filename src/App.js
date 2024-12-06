import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CartProvider } from "./Components/CartContext";
import Home from "./Components/Home";
import Login from "./Components/login";
import SignUp from "./Components/SingIn";
import Des from "./Components/Des";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import anh from "./images/Untitled-Photoroom.png"
import Admin from "./Components/Admin";
import ProductShow from "./Components/Hoang/ProductShow";
import ProductDetail from "./Components/Des";
import ProductTetail from "./Components/Hoang/ProductTetail";
import ProductCart from "./Components/Hoang/ProductCart";
import ProductCheckout from "./Components/Hoang/ProductCheckout";
import Smartphone from "./Components/Hiep/Smartphone"
import Chitietsanpham from "./Components/Hiep/Chitietsanpham";
import CartH from "./Components/Hiep/Cart";
import HomeD from "./Components/Dat/Home";
import DesD from "./Components/Dat/Des";
import PayD from "./Components/Dat/Pay";
import Homed from "./Components/Duc/Home";
import Cartd from "./Components/Duc/Cart";
import CartT from "./Components/Duc/Cart";
import PayT  from "./Components/Duc/Pay";


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
              <Link to="/hoang" className="nav_link">
                Watch
              </Link>
              <Link to="/hiep" className="nav_link">
                SmartPhone
              </Link>
              <Link to="/dat" className="nav_link">
                HeadPhone
              </Link>
              <Link to="/duc" className="nav_link">
                Laptop
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
            <Route path="/hoang" element={<ProductShow/>}/>
            <Route path="/cart_pro" element={<ProductCart/>}/>
            <Route path="/Titail/:products_id" element={<ProductTetail />} />
            <Route path="/checkout_pro" element={<ProductCheckout/>}/>
            <Route path="/hiep" element={<Smartphone/>}/>
            <Route path="/Chitietsanpham/:id" element={<Chitietsanpham/>}/>
            <Route path="/hiep" element={<Smartphone/>}/>
            <Route path="/dat" element={<HomeD/>}/>
            <Route path="/desD/:id" element={<DesD/>}/>
            <Route path="/duc" element={<Homed/>}/>
            <Route path="/payD" element={<PayD/>}/>
            <Route path="/payT" element={<PayT/>}/>
            <Route path="/product/:id" element={<Cartd/>}/>
            <Route path="/product/:id" element={<CartT/>}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
