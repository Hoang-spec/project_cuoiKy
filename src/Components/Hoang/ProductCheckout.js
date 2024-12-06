
import { CartContext } from "../CartContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import dongho from "../image/dongho.png"

function ProductCheckout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(0);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const tong = localStorage.getItem('tong');
    if (tong) {
      setUserName(tong); 
    }
  }, []);


  const xong = (data) => {
    alert("BẠN ĐÃ THANH TOÁN THÀNH CÔNG");
    clearCart();  
    navigate('/');  
  }

  return (
    <div className="Checkout">
    <h1>CHECK OUT</h1>
      <form onSubmit={handleSubmit(xong)}>
        <main>
          <div className="section">
            <section className="Checkout_section1">
              <h1 style={{fontSize : '18px'}}>THÔNG TIN</h1>
              <input 
                type="text" 
                placeholder="Họ và tên"
                {...register('name', { required: 'Tên là bắt buộc' })} 
              />
              {errors.name && <span style={{color : 'red'}}>{errors.name.message}</span>}

              <input 
                type="text" 
                placeholder="Số điện thoại" 
                {...register('phone', { required: 'Số điện thoại là bắt buộc' })} 
              />
              {errors.phone && <span style={{color : "red"}} >{errors.phone.message}</span>}

              <input 
                type="email" 
                placeholder="Email" 
                {...register('email', { required: 'Email là bắt buộc', pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: 'Email không hợp lệ' } })} 
              />
              {errors.email && <span style={{color : "red"}}>{errors.email.message}</span>}
            </section>

            <section className="Checkout_section2">
              <h1 style={{fontSize : '18px'}}>HÌNH THỨC NHẬN HÀNG</h1>
              <input 
                type="radio" 
                {...register('deliveryMethod', { required: 'Vui lòng chọn phương thức nhận hàng' })}
              />
              <label>Nhận hàng trực tiếp</label>
              <input 
                type="radio" 
                {...register('deliveryMethod', { required: 'Vui lòng chọn phương thức nhận hàng' })}
              />
              <label>Nhận tại cửa hàng</label>
              {errors.deliveryMethod && <span style={{color : "red",
                margin : '60px'
              }}>{errors.deliveryMethod.message}</span>}
              <div className="radio_select">
                <select>
                  <option value="" disabled selected hidden>Tỉnh/ Thành phố/ Phường/ Xã</option>
                  <option value="option1">Gia Lai</option>
                  <option value="option2">Đà Nẵng</option>
                  <option value="option3">Quảng Nam</option>
                  <option value="option4">Quảng Ngãi</option>
                </select>
              </div>
              <input type="text" className="Checkout_int" placeholder="Ghi chú:" {...register('note')} />
            </section>

            <section className="Checkout_section3">
              <h2 style={{fontSize : '18px'}}>PHƯƠNG THỨC THANH TOÁN</h2>
              <div className="section_thanhtoan">
                <div className="radion_thanhtoan">
                  <input type="radio" {...register('paymentMethod', { required: 'Vui lòng chọn phương thức thanh toán' })} />
                  <label>Thanh toán khi nhận hàng</label>
                </div>
                <div className="radion_thanhtoan">
                  <input type="radio" {...register('paymentMethod', { required: 'Vui lòng chọn phương thức thanh toán' })} />
                  <label>Thanh toán qua tài khoản ngân hàng</label>
                </div>
                {errors.paymentMethod && <span style={{color : "red"}}>{errors.paymentMethod.message}</span>}
              </div>
            </section>
          </div>

          <section className="section_total">
            <h1 style={{fontSize : '18px'}}>TỔNG TIỀN</h1>
            <p>{userName.toLocaleString("vi-VN")}đ</p>
            <div className="btn">
              <button type="submit">Thanh toán</button>
            </div>
          </section>
        </main>
      </form>

      <footer className="footer">
        <div className="footer_one">
          <div className="footer_main">
            <h2>Gửi phản hồi</h2>
            <div className="invanput">
              <input type="text" placeholder="Vui lòng nhập vào đây" />
              <button>Gửi</button>
            </div>
          </div>
          <div className="footer_text">
            <div className="footer_text1">
              <h2>Heading</h2>
              <p>Lorem lorem loerm</p>
              <p>Lorem lorem loerm</p>
            </div>
            <div className="footer_text1">
              <h2>Heading</h2>
              <p>Lorem lorem loerm</p>
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

export default ProductCheckout;
