import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import user from "../images/pngtree-smiling-girl-point-up-with-fingers-png-image_8800296.png"
import axios from "axios";


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

    if (password !== reenteredPassword) {
      alert("Mật khẩu không khớp. Vui lòng nhập lại.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        gmail,
        password,
      });
      console.log(response.data.message);
      navigate("/"); // Chuyển hướng đến trang Home
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      } else {
        alert("Lỗi đăng ký, vui lòng thử lại.");
      }
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
          </div>z
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
              )}</div>
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