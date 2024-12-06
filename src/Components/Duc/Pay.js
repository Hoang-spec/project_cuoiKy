import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Pay.css"
function PayT() {
  const location = useLocation();
  const { product, quantity, totalPrice } = location.state || {};
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    alert(`
      Thanh toán thành công!
      Thông tin đơn hàng:
      - Sản phẩm: ${product.name}
      - Số lượng: ${quantity}
      - Thành tiền: ${totalPrice.toLocaleString()} VNĐ
      - Số điện thoại: ${phone}
      - Địa chỉ: ${address}
      - Phương thức: ${paymentMethod}
    `);
    navigate("/");
  };

  return (
    <div className="pay-container">
      <h1 className="pay-title">Trang Thanh Toán</h1>
      {product && (
        <div className="pay-order-details">
          <h2>Sản phẩm: {product.name}</h2>
          <p>Số lượng: {quantity}</p>
          <p>Thành tiền: {totalPrice.toLocaleString()} VNĐ</p>
        </div>
      )}
      <div className="pay-form-group">
        <label htmlFor="phone">Số điện thoại nhận hàng</label>
        <input
          type="text"
          id="phone"
          className="pay-input"
          placeholder="Nhập số điện thoại..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="pay-form-group">
        <label htmlFor="address">Địa chỉ nhận hàng</label>
        <input
          type="text"
          id="address"
          className="pay-input"
          placeholder="Nhập địa chỉ..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="pay-form-group">
        <span>Chọn phương thức thanh toán:</span>
        <select
          value={paymentMethod}
          className="pay-select"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="CreditCard">Thẻ tín dụng</option>
          <option value="BankTransfer">Chuyển khoản ngân hàng</option>
        </select>
      </div>
      <button className="pay-button" onClick={handlePayment}>
        Thanh Toán
      </button>
    </div>
  );
}

export default PayT;
