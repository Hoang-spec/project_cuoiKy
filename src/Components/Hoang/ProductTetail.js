import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

function ProductTetail() {
  const [products, setProducts] = useState([]);
  const { products_id } = useParams(); // Lấy id sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Biến để hiển thị trạng thái tải
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
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
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Gọi API để lấy thông tin sản phẩm
        const response = await fetch(
          `https://672d7fa3fd897971564299a4.mockapi.io/product/${products_id}`
        );
        const productData = await response.json();

        // Cập nhật state
        setProduct(productData);
        setLoading(false); // Kết thúc trạng thái tải
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        setLoading(false); // Kết thúc trạng thái tải dù xảy ra lỗi
      }
    };

    fetchProduct();
  }, [products_id]);
  

  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate("/cart_pro")
    }
  };

  if (loading) return <p>Loading...</p>;


  if (!product) return <p>Không tìm thấy sản phẩm!</p>;
  return (
    <div className="Tetail">
    <div className="tetail" style={{marginTop : '100px'}}>
            <div className="tetail_anh">
                <img src={product.avatar} />
            </div>
            <div className="tetail_text">
                <p style={{color : 'black'}}>Watch</p>
                <div className="tetail_info">
                    <h1 style={{color : 'black'}}>{product.name}</h1>
                    <h2 style={{fontSize : "18px"}}>{product.price.toLocaleString("vi-VN")}đ</h2>
                    <div className="tetail_start">
                    <p className="rating">
                        4.5/5 <span className="stars">★★★★☆</span>{" "}
                    </p>
                    </div>
                </div>
                <div className="tetail_infors">
                    <div style={{display : 'flex'}}><p>Product Code : </p><p>FBB00225</p></div>
                    <div style={{display : 'flex'}}><p>Availability : </p><p>In Stock</p></div>
                    <div style={{display : 'flex'}}><p>Type : </p><p>Fruits</p></div>
                    <div style={{display : 'flex'}}><p>Shipping : </p><p>01 day shipping.( Free pickup today)</p></div>
                    <h5 style={{color : 'black'}}>{product.des}</h5>
                </div>
                <div>
                   <button className="tetail_cart" onClick={handleAddToCart}>ADD TO CART</button>
                </div>
            </div>
            
        </div>
        <h1 style={{marginTop : '100px',
          marginBottom : '50px',
          color : 'black'
        }}>SAN PHAM TUONG TU</h1>
        <div className="product_them">

          {products.slice(0, 4).map((pro) =>(
            <div className="pro_them">
              <img src={pro.avatar}/>
              <h1>{pro.name}</h1>
              <p style={{color : 'red'}}>{pro.price.toLocaleString("vi-VN")}đ</p>
            </div>
          ))}
        </div>
        <div className="Show_info">
            <div className="list_info">
                <h2>Product Details</h2>
                <h2>Information</h2>
                <h2>Reviews</h2>
                <h2>Seller Info</h2>
            </div>
            <hr></hr>
            <div className="show_info">
                <h2>Nutrient Value & Benefits</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, tellus iaculis urna bibendum in lacus, integer. Id imperdiet vitae varius sed magnis eu nisi nunc sit. Vel, varius habitant ornare ac rhoncus. Consequat risus facilisis ante ipsum netus risus adipiscing sagittis sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <h2>Storage Tips</h2>
                <p>Nisi, tellus iaculis urna bibendum in lacus, integer. Id imperdiet vitae varius sed magnis eu nisi nunc sit. Vel, varius habitant ornare ac rhoncus. Consequat risus facilisis ante ipsum netus risus adipiscing sagittis sed.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <h2>Unit</h2>
                <p>3 Units</p>
                <h2>Seller</h2>
                <p>DMart Pvt. LTD</p>
                <h2>Disclaimer</h2>
                <p>Image shown is a representation and may slightly vary from the actual product. Every effort is made to maintain accuracy of all information displayed.</p>
            </div>
        </div>
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

export default ProductTetail;
