import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductDetail() {
  const { products_id, product_id } = useParams(); // Lấy id sản phẩm từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Sử dụng addToCart

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://672d7fa3fd897971564299a4.mockapi.io/products/${products_id}`
        );
        const productData = await response.json();

        // Lọc sản phẩm con từ mảng `type`
        const productVariant = productData.type.find(
          (variant) => variant.id === product_id
        );

        if (productVariant) {
          setProduct(productVariant);
        } else {
          console.error("Không tìm thấy sản phẩm con!");
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [products_id, product_id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate("/Cart");
    }
  };
  const handleBuyNow =() =>{
    alert('Hệ thống đang bảo trì, thông văn cảm!!!')
  }

  // Kiểm tra nếu chưa có dữ liệu sản phẩm
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.avatar} alt="Main Product" />
          </div>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ea nisi est quaerat labore pariatur asperiores, consequuntur quod sed. Sint enim quasi, esse autem voluptatem minima eaque voluptatibus officia obcaecati.</p>
          <p className="rating">
            4.5/5 <span className="stars">★★★★☆</span>{" "}
          </p>
          <p>{product.des}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <button onClick={handleBuyNow} className="buy-now">BUY NOW</button>
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

export default ProductDetail;
