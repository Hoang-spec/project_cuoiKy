import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import user from "../images/pngtree-smiling-girl-point-up-with-fingers-png-image_8800296.png";

function Singin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const { username, gmail, password, reenteredPassword } = data;

    // Kiểm tra mật khẩu có khớp không
    if (password !== reenteredPassword) {
      alert("Mật khẩu không khớp. Vui lòng nhập lại.");
      return;
    }

    try {
      setLoading(true);
      // Gửi dữ liệu đăng ký tới MockAPI bằng fetch
      const response = await fetch("https://674c6f7354e1fca9290c8d3f.mockapi.io/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name : username,
          gmail,
          password,
        }),
      });

      // Kiểm tra phản hồi từ API
      if (!response.ok) {
        throw new Error("Lỗi đăng ký, vui lòng thử lại.");
      }

      const result = await response.json();
      console.log(result);  // In ra thông tin người dùng đã được thêm
      alert("Đăng ký thành công!");
      navigate("/"); // Chuyển hướng đến trang Home sau khi đăng ký thành công
    } catch (error) {
      // Nếu có lỗi xảy ra
      console.error(error);
      alert(error.message || "Lỗi đăng ký, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="header-login">
      <div className="header_info-login">
        <div className="login-container">
          <div className="box-avatar">
            <img src={user} alt="User Avatar" />
            <h1>SIGN IN IN HERE</h1>
          </div>
          <form className="box-form" onSubmit={handleSubmit(handleRegister)}>
            <h2>SIGN IN</h2>
            <div className="box-email-password">
              <label>User</label>
              <input
                type="text"
                {...register("username", { required: "Vui lòng nhập User" })}
              />
              {errors.username && (
                <span style={{ color: "red" }}>{errors.username.message}</span>
              )}
            </div>
            <div className="box-email-password">
              <label>Email</label>
              <input
                type="email"
                {...register("gmail", {
                  required: "Vui lòng nhập Email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.gmail && (
                <span style={{ color: "red" }}>{errors.gmail.message}</span>
              )}
            </div>
            <div className="box-email-password">
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: "Vui lòng nhập Pass" })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </div>
            <div className="box-email-password">
              <label>Re-enter Password</label>
              <input
                type="password"
                {...register("reenteredPassword", {
                  required: "Vui lòng nhập lại mật khẩu",
                })}
              />
              {errors.reenteredPassword && (
                <span style={{ color: "red" }}>
                  {errors.reenteredPassword.message}
                </span>
              )}
            </div>
            <div className="box-button-login">
              <button type="submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Singin;
