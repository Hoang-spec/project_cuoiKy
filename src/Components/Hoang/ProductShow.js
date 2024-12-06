
import { Link } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import dongho from "../image/dongho.png"
import "./Hoang.css"
function ProductShow(){
    





    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(
              "https://672d7fa3fd897971564299a4.mockapi.io/product"
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
      const productdis1 = products.filter((product) => product.dis === 1);
      const productdis2 = products.filter((product) => product.dis === 2);
      const filteredDis1 = productdis1.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      const filteredDis2 = productdis2.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      









    return(
        <div  className="hoang">
            <header className="hoang_header">
                <div className="header_a">
                    <div className="header_a_anh">
                        <img src={dongho}/>
                    </div>
                    <div className="header_a_text">
                        <h1 style={{color : 'black'}}>Welcome to Shopping Watch</h1>
                        <p>Lorem loanf activeForm setActiveForm A alertea fjha</p>
                    </div>
                </div>
                <div className="header_b">
                    <div className="header_b_box">
                        <h1>10% discount on iPhone products</h1>
                        <h2>Hurry up</h2>
                        <button>Buy now</button>
                    </div>
                    <div className="header_b_box">
                        <h1>10% discount on iPhone products</h1>
                        <h2>Hurry up</h2>
                        <button>Buy now</button>
                    </div>
                    <div className="header_b_box">
                        <h1>10% discount on iPhone products</h1>
                        <h2>Hurry up</h2>
                        <button>Buy now</button>
                    </div>
                </div>
            </header>
            <div className="hoang_them">
              <h1>Siêu Sale Tết</h1>
              <div  className="noi_bat">
              {products.map((pro) => (
                <div className="hoang_product" key={pro.id}>
                  <img src={pro.avatar}/>
                      <h4 style={{color : 'black'}}>{pro.name}</h4>
                      <h5 style={{color : 'black'}}>{pro.des}</h5>
                      <div className="hoang_an">
                          <p style={{color : 'red',
                                          fontWeight : '700'
                                        }}>{pro.price.toLocaleString("vi-VN")}đ</p>
                          <Link to={`/Titail/${pro.id}`} className="hoang_an_link">
                              +ADD
                          </Link>
                      </div>
                </div>
              ))}
              </div>
            </div>
            <main className="hoang_main">
              <h1 style={{color : 'black'}}>PRODUCT LIST</h1>
            <input type="search" placeholder="Nhap vao san pham can tim"
            onChange={(e) => setQuery(e.target.value)}/>
                <div className="main_a">
                        <div className="hoang_products">
                            {filteredDis1.map((product) => (
                                <div className="hoang_product" key={product.id}>
                                    <img src={product.avatar}/>
                                    <h4 style={{color : 'black'}}>{product.name}</h4>
                                    <h5 style={{color : 'black'}}>{product.des}</h5>
                                    <div className="hoang_an">
                                        <p style={{color : 'red',
                                          fontWeight : '700'
                                        }}>{product.price.toLocaleString("vi-VN")}đ</p>
                                          <Link to={`/Titail/${product.id}`} className="hoang_an_link">
                                            +ADD
                                          </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
                <dic className="main_b">
                    <h1 style={{color : 'black'}}>Sell off</h1>
                    <div className="hoang_products">
                        {filteredDis2.map((product) => (
                            <div className="hoang_product" key={product.id}
                            style={{borderRadius : '10px 30px 10px 10px'}} >
                                <div className="discount"> Giảm 10%</div>
                                <img src={product.avatar}/>
                                    <h4 style={{color : 'black'}}>{product.name}</h4>
                                    <h5 style={{color : 'black'}}>{product.des}</h5>
                                    <div className="hoang_an">
                                        <p style={{display : 'flex',
                                                    height : '30px',
                                                    alignItems : 'center',
                                                    width :'170px',
                                                    justifyContent : 'space-around',
                                                    alignItems :'center'
                                        }}>
                                        <p style={{color : 'red',
                                          fontWeight : '700'
                                        }}>{(product.price * 0.9).toLocaleString("vi-VN")}đ</p>
                                          <p>
                                            <del style={{ opacity: "0.5" }}>
                                              {product.price.toLocaleString("vi-VN")}đ
                                            </del>
                                          </p></p>
                                          <Link to={`/Titail/${product.id}`} className="hoang_an_link">
                                            +ADD
                                          </Link>
                                    </div>
                            </div>
                        ))}
                    </div>
                </dic>
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
    )

}
export default ProductShow;