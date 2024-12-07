import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import banner from "../../images/z6083161069072_2e5afbdec298dcf096a52ac77dba7de6.jpg"

import "./Home.css"

function HomeT() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://67492cfd5801f51535932c6d.mockapi.io/api/v1/laptops"
        );
        let data = await response.json();
        setProducts(data.slice(0, 12)); // Lấy tối đa 12 sản phẩm
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Home" >
      <header
        className="header"
        style={{backgroundImage: `url(${banner})`,
        width : '1440px'}}
      >
        <div className="header_main">
          <div className="header_info">
            <h1 style={{color : 'white',
              width : '400px'
            }}>LAPTOP SO 1 VN</h1>
            <p style={{color : 'white'}}>Uy tín đặt lên hàng đầu</p>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="main_search">
          <div className="search_text">
            <h1 style={{color : 'red'}}>DANH SÁCH SẢN PHẨM</h1>
          </div>
          <div className="search_button">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search_in"
              placeholder="Search"
            />
            <input type="submit" value="Search" className="search_sub" />
          </div>
        </div>
        <div className="main_products">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product_li">
              <div className="product">
                <div className="product_img">
                  <img src={product.avatar} alt={product.name} />
                </div>
                <h2>{product.name}</h2>
                <p>Giá: {product.price.toLocaleString()} VNĐ</p>
                <div className="nutan">
                  <Link to={`/product/${product.id}`} className="toan" style={{textAlign : 'center'}}>
                   Description
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="help-container">
          <a href="https://zalo.me/0396132052" className="help-button">
            Zalo
          </a>
        </div>
      </main>
      <footer className="footer">
        <div className="footer_one">
          <div className="footer_main">
            <h2>Gửi phản hồi</h2>
            <div className="invanput">
              <input type="text" placeholder="Vui lòng nhập vào đây" />
              <button>Gửi</button>
            </div>
          </div>
          <div className="footer_text">
            <div className="footer_text1">
              <h2>Heading</h2>
              <p>lorem lorem lorem</p>
              <p>lorem lorem lorem</p>
            </div>
            <div className="footer_text1">
              <h2>Heading</h2>
              <p>lorem lorem lorem</p>
            </div>
          </div>
        </div>
        <div className="footer_two">
          <p>Facebook : Nguyen Van Hoang</p>
        </div>
      </footer>
    </div>
  );
}

export default HomeT;
