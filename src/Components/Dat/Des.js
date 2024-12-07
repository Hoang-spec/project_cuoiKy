import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Des.css"
function DesD() {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null); // Lưu thông tin sản phẩm
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const [loading, setLoading] = useState(true); // Kiểm tra trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi nếu có
  const navigate = useNavigate();

  // Hàm điều hướng đến trang thanh toán
  const handleBuyNow = () => {
    navigate("/payD", {
      state: {
        product: product, // Truyền sản phẩm
        quantity: quantity, // Truyền số lượng
        totalPrice: product.price * quantity, // Truyền tổng tiền
      },
    });
  };

  // Hàm gọi API để lấy thông tin sản phẩm
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://6745b5c0512ddbd807f9480f.mockapi.io/codelo/taiphone/${id}`
      );
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      const data = await response.json();
      setProduct(data); // Lưu sản phẩm vào state
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  // Gọi hàm fetchProduct khi component được render lần đầu
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Hiển thị trạng thái tải dữ liệu
  if (loading) return <div>Loading...</div>;

  // Hiển thị lỗi nếu có
  if (error) return <div>{error}</div>;

  // Hiển thị nếu không tìm thấy sản phẩm
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  // Hàm thay đổi số lượng
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1); // Đảm bảo số lượng tối thiểu là 1
    setQuantity(value);
  };

  // Hiển thị giao diện chi tiết sản phẩm
  return (
    <div className="product-detail">
      <div className="product-content">
        <div className="product-image">
          <img src={product.avatar} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-price">Giá: ${product.price}</p>
          <div className="product-quantity">
            <label htmlFor="quantity">Số lượng:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
            />
          </div>
          <p className="product-total">Tổng giá: ${product.price * quantity}</p>
          <button style={{
            width : '200px',
            height : '50px',
            border : 'none',
            backgroundColor : '#4caf50'
          }} onClick={handleBuyNow}>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesD;
