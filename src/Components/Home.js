import { Link } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import React from 'react';
import user from "../images/removed-background.png"
import duc from "../images/Remove-bg.ai_1731470373511.png"
import anh from "../images/lenovo-legion-5-pro-core-i7-11800h-16gb-512gb-rtx-3060-6gb-3678-3-Photoroom.png"
import buy from "../images/buy_online.png"
import pay from "../images/pay_online.png"
import ship from "../images/shipper.jpg"
import banner from "../images/baner.png"

import "../App.css";
function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const carouselRef = useRef([]);


  const scrollLeft = (index) => {
    if (carouselRef.current[index]) {
      carouselRef.current[index].scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (index) => {
    if (carouselRef.current[index]) {
      carouselRef.current[index].scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://672d7fa3fd897971564299a4.mockapi.io/products"
        );
        let data = await response.json();
        data = data.sort(() => 0.5 - Math.random());
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);



  const filteredProducts = products
  .map((product) => {
    const filteredTypes = product.type.filter((product_child) =>
      product_child.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredTypes.length > 0) {
      
      return { ...product, type: filteredTypes };
    }
    return null; 
  })
  .filter((product) => product !== null);

  

  return (
    <div className="Home">
      <header className="header" style={{backgroundImage: `url(${banner})`,
                                          width : '1440px'}}>
        <div className="header_main">
        <div className="header_info">
          <h1>NHÓM LỤM</h1>
          <h2>Trang web bán hàng online uy tín</h2>
          <p>Chúc anh chị em 8386</p>
          <div className="header_button">
            <Link to="/Login" className="login">
              LOGIN
            </Link>
            <Link to="/SignIn" className="login">
              SIGN IN
            </Link>
          </div>
        </div>
        <div className="header_img">
          <img src={anh}/>
        </div>
        </div>
      </header>
      <main className="main">
        <div className="main_one">
          <div className="one_text">
            <h4>SERVICE</h4>
            <h5>Lorem Loron loem</h5>
          </div>
          <div className="one_main">
            <div className="one_box">
              <img src={buy} />
              <h2>Buy Online</h2>
              <p>It can be a very secure path to earn good money and make you very successful creative entrepreneur.</p>
            </div>
            <div className="one_box">
              <img src={pay} />
              <h2>Pay Online</h2>
              <p>It can be a very secure path to earn good money and make you very successful creative entrepreneur.</p>
            </div>
            <div className="one_box">
              <img src={ship} />
              <h2>Ship Every Where</h2>
              <p>It can be a very secure path to earn good money and make you very successful creative entrepreneur.</p>
            </div>
          </div>
        </div>
        <div className="main_search">
          <div className="search_text">
            <h1>DANH SÁCH SẢN PHẨM</h1>
            <h2>Các món hàng dưới đây là lí min tịt</h2>
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
          {filteredProducts.length > 0 ? (
            <ul className="products_list">
              {filteredProducts.map((product, index) => (
                <li key={product.id} className="product_li">
                  <h1>{product.name}</h1>
                  <button className="prev-btn" onClick={() => scrollLeft(index)}> &#9664;</button>
                  <div className="products"  ref={(el) => (carouselRef.current[index] = el)}>
                    {product.type.map((product_child) => (
                      <div className="product" key={product_child.id}>
                        <div className="product_img">
                        <img src={product_child.avatar} alt={product_child.name} />
                        </div>
                        <h2>{product_child.name}</h2>
                        <h2>{product_child.des}</h2>
                        <div className="nutan">
                          <Link to={`./des/${product.id}/product_child/${product_child.id}`} className="toan">
                            $ {product_child.price}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="prev-btnR" onClick={() => scrollRight(index)}> &#9654;</button>
                </li>
              ))}
            </ul>
          ) : (
            <h2 style={{ textAlign: "center", color: "red", width: "1280px", margin: "100px" }}>
              KHÔNG TÌM THẤY SẢN PHẨM
            </h2>
          )}
        </div>


        <div class="help-container">
        <a 
            href="https://zalo.me/0396132052" 
            className="help-button" 
        >
            Zalo
        </a>
        </div>
        <h1> Thong tin ve chung toi</h1>
        <div className="main_two">

          <div className="two_img">
            <h1>H</h1>
            <div className="dep">
              <div className="anh" style={{backgroundImage : `url(${user})`}}></div>
              <div className="dep_text">
              <h5>Nguyen Van Hoang</h5>
              <h5>Lop : ST23D</h5>
              <h5>IDSV : 106431</h5>
              </div>
            </div>
          </div>
          <div className="two_img">
            <h1>D</h1>
            <div className="dep">
              <div className="anh" style={{backgroundImage : `url(${duc})`}}></div>
              <div className="dep_text">
              <h5>Thai Dinh Duc</h5>
              <h5>Lop : ST23D</h5>
              <h5>IDSV : 106165</h5>
              </div>
            </div>
          </div>
          <div className="two_img">
            <h1>D</h1>
            <div className="dep">
              <div className="anh"  style={{backgroundImage : `url(${user})`}}></div>
              <div className="dep_text">
              <h5>Nguyen Van Hoang</h5>
              <h5>Lop : ST23D</h5>
              <h5>IDSV : 106431</h5>
              </div>
            </div>
          </div>
          <div className="two_img">
            <h1>D</h1>
            <div className="dep">
              <div className="anh" style={{backgroundImage : `url(${user})`}}></div>
              <div className="dep_text">
              <h5>Nguyen Van Hoang</h5>
              <h5>Lop : ST23D</h5>
              <h5>IDSV : 106431</h5>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer_one">
          <div className="footer_main">
            <h2>Gửi phản hồi </h2>
            <div className="invanput">
            <input type="text" placeholder="Vui lòng nhập vào đây" ></input>
            <button>Gửi</button>
            </div>
          </div>
          <div className="footer_text">
            <div className="footer_text1">
              <h2>Heading</h2>
              <p>lorem lorem loerm</p>
              <p>lorem lorem loerm</p>
            </div>
            <div className="footer_text1">
              <h2>Heading</h2>
              <p>lorem lorem loerm</p>
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

export default Home;
