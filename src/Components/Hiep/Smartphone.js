import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import sale1 from "../image/banner2.jpg";
import sale2 from "../image/banner3.png";
import lua from "../image/lua.png";
import iphone from "../image/9-Photoroom.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../image/Untitled-Photoroom.png";
import ship from "../image/shipper.webp";
import res from "../image/res.png";
import footer from "../../images/fotter.png"
import baohanh from "../image/baohanh.png";

import "./Smartphone.css"


function App() {
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [More, setMore] = useState(8);
  const [Search, setSearch] = useState("");
  const [Price, setPrice] = useState([0, 40000000]);
  const [brand, setbrand] = useState("");
  
  const [openQuestion, setOpenQuestion] = useState(null);
  const filteredProduct = products2.filter(
    (product) =>
      product.name.toLowerCase().includes(Search.toLowerCase()) &&
      product.price >= Price[0] &&
      product.price <= Price[1] &&
      (brand === "" || product.brand === brand) // Đảm bảo lọc theo thương hiệu khi có thương hiệu được chọn
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handlePrice = (e) => {
    const value = e.target.value.split(",").map(Number);
    setPrice(value);
  };
  const handlebrand = (e) => setbrand(e.target.value); // xu li khi chon loai san pham
  const handleAddtocart = () => {
    Navigate("/Chitietsanpham");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://6741a5e3e4647499008e57b0.mockapi.io/api/v1/Products"
        );
        let data = await response.json();

        // Trộn ngẫu nhiên danh sách sản phẩm
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);

        // Lưu 5 sản phẩm vào state
        setProducts(randomProducts);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    const fetchProductsfull = async () => {
      try {
        const response = await fetch(
          "https://6741a5e3e4647499008e57b0.mockapi.io/api/v1/Products"
        );
        let data = await response.json();

        // Lưu toàn bộ sản phẩm vào state
        setProducts2(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
    fetchProductsfull();
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const handleShowmore = () => {
    setMore(products2.length);
  };
  // Hàm tính toán thời gian còn lại
  function calculateTimeLeft() {
    const targetDate = new Date("2024-12-31T23:59:59"); // Đặt ngày đếm ngược
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      return null; // Hết thời gian
    }
  }

  // Cập nhật đồng hồ mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp interval khi component bị hủy
  }, []);

  return (
    <div className="smartPhone">
      <div className="banner ">
        <div className="box-left">
          <div>
            <img src={logo} alt="" className="logowed" />
          </div>
          <div className="tittlebig">
            <h1 className="Hphone">Nhom Lụm</h1>
            <p className="tittle">Địa điểm bán điện thoại uy tín</p>
          </div>
        </div>
        <div className="box-right">
          <img src={iphone} alt="" className="img-banner" />
        </div>
      </div>

      <div className="box-spnb">
        <div className="box-spnb1">
          <div className="box-spnb3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="currentColor"
              class="bi bi-fire"
              viewBox="0 0 16 16"
              className="icon"
            >
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
            </svg>
            <div className="font-sp">FLASH</div>
            <div className="font-nb">SALES</div>
          </div>
          <div className="dongho">
            {timeLeft ? (
              <>
                <span>Kết thúc sau: </span>
                <span>{String(timeLeft.days).padStart(2, "0")} ngày </span>
                <span>{String(timeLeft.hours).padStart(2, "0")} giờ </span>
                <span>{String(timeLeft.minutes).padStart(2, "0")} phút </span>
                <span>{String(timeLeft.seconds).padStart(2, "0")} giây</span>
              </>
            ) : (
              <span>Thời gian đã hết!</span>
            )}
          </div>
        </div>
        <div className="box-spnb2">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.avatar}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>

                <p className="product-price price-giamgia">
                  <div>
                    <del style={{ opacity: "0.5" }}>
                      {Number(product.price).toLocaleString("vi-VN")}đ
                    </del>
                  </div>
                  <div>
                    {" "}
                    {Number(product.price * 0.9).toLocaleString("vi-VN")}đ
                  </div>
                </p>

                <Link
                  className="addtocart"
                  to={`/Chitietsanpham/${product.id}`}
                  onClick={handleAddtocart}
                >
                  Thêm vào giỏ hàng
                </Link>
              </div>
            ))
          ) : (
            <p>Đang tải sản phẩm...</p>
          )}
        </div>
        <div className="list-sp">
          <div style={{marginLeft : '50px'}} className="spcct">Sản phẩm của chúng tôi</div>
          <div className="box-timkiem">
            <input
              type="text"
              placeholder="Bạn cần tìm gì..."
              value={Search}
              onChange={handleSearch}
              className="search-box"
            />
            <div className="fill-price">
              <label htmlFor="">
                <select onChange={handlePrice} className="box-sel">
                  <option value="0,40000000">Tất cả</option>
                  <option value="0,10000000">Dưới 10,000,000đ</option>
                  <option value="10000000,20000000">
                    10,000,000đ - 20,0,00,000
                  </option>
                  <option value="20000000,30000000">
                    20,000,000đ - 30,000,000
                  </option>
                </select>
              </label>
            </div>
            <div className="fill-price">
              <label htmlFor="">
                <select onChange={handlebrand} className="box-sel">
                  <option value="">Loại</option>
                  <option value="samsung">Samsung</option>
                  <option value="iphone">Iphone</option>
                  <option value="oppo">Oppo</option>
                </select>
              </label>
            </div>
          </div>
          <div className="list-products">
            {filteredProduct.length > 0 ? (
              filteredProduct.slice(0, More).map((product2) => (
                <div key={product2.id} className="product-card">
                  <img
                    src={product2.avatar}
                    alt={product2.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product2.name}</h3>

                  <p className="product-price">
                    {Number(product2.price).toLocaleString("vi-VN")}đ
                  </p>

                  <Link
                    className="addtocart link-button"
                    to={`/Chitietsanpham/${product2.id}`}
                    onClick={handleAddtocart}
                  >
                    Thêm vào giỏ hàng
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm</p>
            )}
            {More < products2.length && (
              <button onClick={handleShowmore} className="btn-more">
                Hiện thêm
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="dichvu">
        <h1 style={{fontSize : '18px'}} className="font-sp font-dichvu2">Dịch vụ đặc biệc của chúng tôi</h1>
        <h3 style={{fontSize : '16px'}} className="font-dichvu2">
          Nhũng dịch vụ tốt nhất dành cho khách hàng của chúng thôi
        </h3>
        <div className="list-dichvu">
          <div className="box-dichvu">
            <img src={baohanh} alt="" className="img-dichvu" />
            <p className="font-dichvu">
              Cửa hàng bảo hành cho các sản phẩm được mua trong 12 tháng{" "}
            </p>
          </div>
          <div className="box-dichvu">
            <img src={ship} alt="" className="img-dichvu" />
            <p className="font-dichvu">
              Sản phẩm của khách hàng được giao trong vòng 2-3 ngày
            </p>
          </div>
          <div className="box-dichvu">
            <img src={res} alt="" className="img-dichvu" />
            <p className="font-dichvu">
              Nhân viên cửa hàng trả lời câu hỏi từ khách hàng 24/24
            </p>
          </div>
        </div>
      </div>
      <div className="question">
        <h2>Câu hỏi thường gặp</h2>
        <div>
          {[
            {
              question: "Chính sách bảo hành như thế nào?",
              answer:
                "Cửa hàng bảo hành sản phẩm trong vòng 12 tháng với các lỗi từ nhà sản xuất.",
            },
            {
              question: "Thời gian giao hàng bao lâu?",
              answer: "Thời gian giao hàng thông thường là 2-3 ngày làm việc.",
            },
            {
              question: "Tôi có thể đổi trả sản phẩm không?",
              answer:
                "Sản phẩm được đổi trả trong vòng 7 ngày nếu chưa kích hoạt và còn nguyên vẹn.",
            },
          ].map((faq, index) => (
            <div key={index} className="box-qs1">
              <div
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? null : index)
                }
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "black",
                  marginBottom: "10px",
                }}
              >
                {faq.question}
              </div>
              {openQuestion === index && (
                <div style={{ marginLeft: "20px", color: "#333" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="box-phanhoi">
          <input type="text" placeholder="Nhập câu hỏi" className="ip-qs" />
          <a href="/Smartphone" className="btn-phanhoi">
            Gửi
          </a>
        </div>
      </div>
      <div className="footer">
        <img src={footer}/>
      </div>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
}

export default App;
