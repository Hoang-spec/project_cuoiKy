import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import blue from "../image/blue.png";
import red from "../image/red.jpg";
import yellow from "../image/yellow.jpg";




function Chitietsanpham() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Thêm vào giỏ hàng

  useEffect(() => {
    if (!id) {
      console.error("Không tìm thấy ID sản phẩm trong URL");
      navigate("/"); // Điều hướng về trang chính nếu không có id
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://6741a5e3e4647499008e57b0.mockapi.io/api/v1/Products/${id}`
        );

        const data = await response.json();
        setProduct(data); // Lưu dữ liệu sản phẩm vào state
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải dữ liệu sản phẩm...</p>;
  const handleAddtocart = () => {
    if (product) {
      addToCart(product);
      navigate("/CartH");
    }
  };
  return (
    <div className="box-chitiet">
      <div className="box-chitiet2">
        <div className="box-chitiet3">
          <img
            src={product.avatar}
            alt={product.name}
            className="image-chitiet"
          />
        </div>
        <div className="box-chitiet5">
          <h1>{product.name}</h1>
          <div className="icon-chitiet">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-half"
              viewBox="0 0 16 16"
            >
              <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
            </svg>
          </div>
          <p >999 reviews</p>
          <div>CPU Dual-core Cortex A9 tốc độ 1GHz</div>
          <h2 className="price-chitietsp">
            Giá:
            <div className="price-chitietsp2">
              {Number(product.price).toLocaleString("vi-VN")}đ
            </div>
       
          </h2>
          <div>
            <b>100%</b> hàng <b>chất lượng</b>, đảm bảo <b>uy tín</b>!
          </div>
          <button onClick={handleAddtocart} className="btn-chitietadd">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <div className="box-chitiet4">
        <h5 style={{color :  "black"}}>Thông tin chi tiết về sản phẩm</h5>
        <div>Màn hình 9.7 inch, cảm ứng điện dung đa điểm</div>
      </div>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
}

export default Chitietsanpham;
