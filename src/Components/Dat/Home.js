import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import buy from "../../images/buy_online.png"
import pay from "../../images/pay_online.png"
import ship from "../../images/shipper.jpg"
import nen from "../../images/OIP.jpg"
import { useNavigate } from "react-router-dom";

function HomeD() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/desD/${id}`); // Điều hướng đến trang chi tiết sản phẩm
  };
  // Hàm tính thời gian sale còn lại
  const calculateTimeLeft = () => {
    const diff = new Date("2024-12-31T23:59:59") - new Date();
    return diff <= 0
      ? "Hết hạn"
      : `${Math.floor((diff / 3600000) % 24)} giờ ${Math.floor(
          (diff / 60000) % 60
        )} phút ${Math.floor((diff / 1000) % 60)} giây`;
  };

  // Cập nhật thời gian sale mỗi giây
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Gọi API lấy danh sách sản phẩm
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://674c7e4c54e1fca9290cb9f4.mockapi.io/chien"
        );
        const data = await response.json();
        setProducts(data.sort(() => 0.5 - Math.random())); // Trộn ngẫu nhiên
      } catch {
        setProducts([]);
      }
    })();
  }, []);

  // Lọc sản phẩm theo từ khóa
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Home" style={{backgroundColor : 'black'}}>
      <header
        className="header"
        style={{ backgroundImage: `url(${nen})`, width: "1440px" }}
      >
        <div className="navbar">
        </div>
      </header>

      <main className="main-content">
        <section className="hero-banner">
          <h1>Chào mừng bạn đến</h1>
        </section>

   

        <section className="product-search">
          <h2>Danh sách sản phẩm</h2>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div style={{width : '350px',
                  backgroundColor : 'pink'
                }} className="product-card" key={product.id}>
                  <img src={product.avatar} alt={product.name} />
                  <h3 style={{fontSize : '16px'}}>{product.name}</h3>
                  <p>${product.price}</p>
                  {/* Sử dụng button và hàm điều hướng */}
                  <button
                    className="button-buy"
                    onClick={() => handleNavigate(product.id)} // Gọi handleNavigate khi nhấn nút
                  >
                    Mua ngay
                  </button>
                </div>
              ))
            ) : (
              <p>Không tìm thấy sản phẩm</p>
            )}
          </div>
        </section>

        <section className="team">
          <h2>Thông tin liên hệ</h2>
          <ul>
            <li>
              Gmail:{" "}
              <a href="mailto:tuandatwj@gmail.com">tuandatwj@gmail.com</a>
            </li>
            <li>
              SDT: <a href="tel:0964749437">0964749437</a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-feedback">
          <h2>Phản hồi</h2>
          <input type="text" placeholder="Nhập phản hồi của bạn" />
          <button>Gửi</button>
        </div>
        <p>© 2024 E-Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomeD;
