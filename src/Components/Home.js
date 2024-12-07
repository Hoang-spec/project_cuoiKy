import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import user from "../images/removed-background.png";
import duc from "../images/Remove-bg.ai_1731470373511.png";
import anh from "../images/lenovo-legion-5-pro-core-i7-11800h-16gb-512gb-rtx-3060-6gb-3678-3-Photoroom.png";
import buy from "../images/buy_online.png";
import pay from "../images/pay_online.png";
import ship from "../images/shipper.jpg";
import banner from "../images/baner.png";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(""); // State lưu tên người dùng
  const carouselRef = useRef([]);

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name); // Cập nhật tên người dùng từ localStorage
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
    setUserName(""); // Cập nhật lại trạng thái userName về rỗng
  };

  const scrollLeft = (index) => {
    if (carouselRef.current[index]) {
      carouselRef.current[index].scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (index) => {
    if (carouselRef.current[index]) {
      carouselRef.current[index].scrollBy({ left: 300, behavior: "smooth" });
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
      <header
        className="header"
        style={{
          backgroundImage: `url(${banner})`,
          width: "1440px",
        }}
      >
        <div className="header_main">
          <div className="header_info">
            <h1>NHÓM LỤM</h1>
            <h2>Trang web bán hàng online uy tín</h2>
            <p>Chúc anh chị em 8386</p>
            <div className="header_button">
              {!userName ? (
                <>
                  <Link to="/Login" className="login">
                    LOGIN
                  </Link>
                  <Link to="/SignIn" className="login">
                    SIGN IN
                  </Link>
                </>
              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '250px'
                }}>
                  <span style={{
                    width : '200px',
                    paddingTop : '10px',
                    height : '50px',
                    borderRadius : '4px',
                    display : 'flex',
                    justifyContent : 'center',
                    color : 'white',
                    fontSize : '18px',
                    fontWeight : '700',
                    border : 'none',
                    textAlign : 'center',
                    backgroundColor : '#4caf50'
                  }}>{userName}</span>
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      width :'200px',
                      marginLeft  : '20px',
                      height : '50px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor  :'#333'
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="header_img">
            <img src={anh} />
          </div>
        </div>
      </header>

      <main className="main">
        {/* Content here */}
        {/* Other sections of your main content */}
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
              <p>lorem lorem loerm</p>
              <p>lorem lorem loerm</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
