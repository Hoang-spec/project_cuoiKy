import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate để chuyển trang
import "./Cart.css"

const CartT = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null); // Thông tin sản phẩm
  const [quantity, setQuantity] = useState(1); // Số lượng, mặc định là 1
  const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
  const navigate = useNavigate(); // Hook điều hướng

  // Lấy thông tin sản phẩm từ API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://67492cfd5801f51535932c6d.mockapi.io/api/v1/laptops/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setTotalPrice(data.price); // Khởi tạo tổng tiền bằng giá ban đầu
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Tính lại tổng tiền khi số lượng thay đổi
  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity); // Tổng tiền = giá * số lượng
    }
  }, [quantity, product]);

  // Xử lý khi nhấn nút "Mua"
  const handlePurchase = () => {
    navigate("/payT", { state: { product, quantity, totalPrice } }); // Chuyển đến trang thanh toán
  };

  if (!product) {
    return <h1>Đang tải thông tin sản phẩm...</h1>;
  }

  return (
    <div className="cart">
      <div className="product-detail">
        <img src={product.avatar} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Giá: {product.price.toLocaleString()} VNĐ</p>

        {/* Input để chỉnh số lượng */}
        <div className="quantity">
          <label htmlFor="quantity">Số lượng: </label>
          <input
            type="number"
            id="quantity"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        {/* Hiển thị tổng tiền */}
        <p>
          <strong>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</strong>
        </p>

        {/* Nút mua */}
        <button className="button" type="button" onClick={handlePurchase}>
          Mua
        </button>
      </div>
    </div>
  );
};

export default CartT;
