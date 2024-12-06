import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";
function HCart() {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeCartItem } = useContext(CartContext); // Thêm functions để update và remove items

  // Tính tổng giá trị giỏ hàng
  const Totalprice = cartItems.reduce(
    (total, item) => total + (parseFloat(item.price) * item.quantity || 0),
    0
  );
  // Thêm chức năng cập nhật số lượng sản phẩm
  const handleIncreaseQuantity = (id) => {
    updateCartItem(id, 'increase');
  };

  const handleDecreaseQuantity = (id) => {
    updateCartItem(id, 'decrease');
  };

  const handleRemoveItem = (id) => {
    removeCartItem(id);
  };

  function HandleCheckout() {
    localStorage.setItem('tong', Totalprice)
    navigate("/checkout_pro");

  }

  const HandleBack = () => {
    navigate("/");
  };

  return (
    <div className="project_pro">
      <div className="tieude_pro" style={{marginLeft : '200px'}}>
        <h1>Your cart : </h1>
        <p style={{width : '600px',
            border : '1px solid red',
            height : '30px',
            paddingTop : '5px',
            paddingLeft : '10px',
            borderRadius : '4px',
            backgroundColor : '#F8D6D6'
        }}>You’ve got FREE delivery. Start checkout now!</p>
      </div>
      <div className="cart_pro">
        <div className="my_cart_pro">
          {cartItems.length === 0 ? (
            <p>Không có sản phẩm trong giỏ hàng</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div className="cart_item_pro" key={item.id}>
                    <img src={item.avatar}/>
                    <div className="cart_pro_in">
                        <h2>{item.name}</h2>
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </div>
                    <div className="cart_an">
                        <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button style={{borderRadius : '0px 4px 4px 0px'}} onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    </div>
                    <div className="cart_gia">
                        <p>{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="total_pro">
            <button onClick={HandleBack}>Continue Shopping</button>
            <button onClick={HandleCheckout} style={{backgroundColor : '#4caf50'}}>Check out</button>
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

export default HCart;
