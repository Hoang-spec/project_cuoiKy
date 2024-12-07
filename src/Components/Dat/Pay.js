import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Pay.css";

function PayD() {
  const location = useLocation(); // Nhận dữ liệu từ Des
  const navigate = useNavigate();

  // Nhận dữ liệu sản phẩm từ state được truyền qua
  const { product, quantity, totalPrice } = location.state || {};
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // Phương thức thanh toán

  // Kiểm tra và lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem("address") || "";
    const storedPhone = localStorage.getItem("phoneNumber") || "";
    const storedPaymentMethod = localStorage.getItem("paymentMethod") || "";

    // Hiển thị giá trị từ localStorage vào các input
    console.log("Stored Address:", storedAddress);
    console.log("Stored Phone:", storedPhone);
    console.log("Stored Payment Method:", storedPaymentMethod);

    // Cập nhật giá trị vào state nếu có
    setAddress(storedAddress);
    setPhone(storedPhone);
    setPaymentMethod(storedPaymentMethod);
  }, []); // Chạy khi component được mount

  // Xử lý logic nếu không có dữ liệu
  if (!product || !quantity || !totalPrice) {
    return <div>Không có thông tin sản phẩm. Vui lòng quay lại.</div>;
  }

  // Hàm xử lý khi bấm "Thanh toán"
  const handlePayment = () => {
    if (!address || !phoneNumber || !paymentMethod) {
      alert(
        "Vui lòng nhập đầy đủ thông tin giao hàng và chọn phương thức thanh toán."
      );
      return;
    }

    // Lưu thông tin vào localStorage
    localStorage.setItem("address", address);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("paymentMethod", paymentMethod);

    // Chuyển hướng hoặc thực hiện logic thanh toán ở đây
    alert(`Đơn hàng của bạn đã được đặt! Tổng tiền: $${totalPrice}`);
    navigate("/"); // Quay về trang chính
  };

  return (
    <div
      style={{
        width: "1440px",
        color: "white",
      }}
      className="pay-container"
    >
      <h1>Thanh toán sản phẩm</h1>
      <div className="pay-info">
        <p>Sản phẩm: {product.name}</p>
        <p>Đơn giá: ${product.price}</p>
        <p>Số lượng: {quantity}</p>
        <p className="pay-total">Tổng tiền: ${totalPrice}</p>
      </div>
      <div className="pay-form">
        <label>Địa chỉ Nhận hàng</label>
        <input
          type="text"
          placeholder="Nhập địa chỉ..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Số điện thoại</label>
        <input
          type="text"
          placeholder="Nhập số điện thoại..."
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Phương thức thanh toán:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Chọn phương thức</option>
          <option value="cod">Thanh toán khi nhận hàng</option>
          <option value="online">Thanh toán trực tuyến</option>
        </select>
      </div>
      <div className="pay-actions">
        <button className="pay-button" onClick={handlePayment}>
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default PayD;
