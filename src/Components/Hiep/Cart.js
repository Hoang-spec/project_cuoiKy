import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";


function CartH() {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeCartItem } = useContext(CartContext); // Thêm functions để update và remove items

  // Tính tổng giá trị giỏ hàng
  const Totalprice = cartItems.reduce(
    (total, item) => total + (parseFloat(item.price) * item.quantity || 0),
    0
  );
  // Thêm chức năng cập nhật số lượng sản phẩm
  const handleIncreaseQuantity = (id) => {
    updateCartItem(id, "increase");
  };

  const handleDecreaseQuantity = (id) => {
    updateCartItem(id, "decrease");
  };

  const handleRemoveItem = (id) => {
    removeCartItem(id);
  };

  function HandleCheckout() {
    localStorage.setItem("tong", Totalprice);
    navigate("/checkout");
  }

  const HandleBack = () => {
    navigate("/");
  };

  return (
    <div className="project">
      <div className="tieude">
        <button className="back" onClick={HandleBack}>
          &lt; back
        </button>
        <div className="heading">Your cart : </div>
      </div>
      <div style={{display : 'flex'}}>
        <div className="my_cart">
          {cartItems.length === 0 ? (
            <p>Không có sản phẩm trong giỏ hàng</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div className="cart_item" key={item.id}>
                  <img src={item.avatar || ""} alt={item.name} />
                  <div className="column box-font">
                    <div>
                      <div className="fontchu1">{item.name}</div>
                      <div className="fontchu2">${item.price}</div>
                    </div>
                    <div className="them_xoa">
                      <div className="quantity-control">
                        <button onClick={() => handleDecreaseQuantity(item.id)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncreaseQuantity(item.id)}>
                          +
                        </button>
                      </div>
                      <button
                        className="remove-item"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="table_Totalprice">
          <div className="TOTAL">Total : </div>
          <table>
            <tbody className="tittle">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-name3">{item.name}</div>
                    <div className="product-price3">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="box_checkout">
            <div className="Title">
              <div className="total_and">TOTAL: </div>
              <div className="total_price">${Totalprice}</div>
            </div>
            <button className="checkout" onClick={HandleCheckout}>
              Check out
            </button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer_one">
          <div className="footer_main">
            <h2>Gửi phản hồi </h2>
            <div className="invanput">
              <input type="text" placeholder="Vui lòng nhập vào đây"></input>
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

export default CartH;
