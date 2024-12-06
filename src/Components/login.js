import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import user from "../images/pngtree-smiling-girl-point-up-with-fingers-png-image_8800296.png";
import axios from "axios";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(""); // Trạng thái lưu lỗi
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true); // Bắt đầu loading
    setError(""); // Xóa lỗi trước đó

    try {
      const response = await axios.post(
        "https://674c6f7354e1fca9290c8d3f.mockapi.io/login", // Đổi API URL cho đúng
        {
          username: data.name,
          password: data.password,
        }
      );

      console.log(response.data); // In ra dữ liệu phản hồi từ server

      if (response.status === 200) {
        // Lưu thông tin nếu cần (ví dụ: token)
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Chuyển hướng tới trang Home
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Sai tên đăng nhập hoặc mật khẩu!");
      } else {
        setError("Lỗi máy chủ! Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="header-login">
      <div className="header_info-login">
        <div className="login-container">
          <div className="box-avatar">
            <img src={user} alt="User Avatar" />
            <h1>LOGIN IN HERE</h1>
          </div>
          <form className="box-form" onSubmit={handleSubmit(handleLogin)}>
            <h2>LOGIN</h2>
            <div className="box-email-password">
              <label>Email or Phone Number</label>
              <input
                type="text"
                {...register("name", { required: "Vui lòng nhập Email hoăc Phone" })}
              />
              {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
            </div>
            <div className="box-email-password">
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: "Vui lòng nhập Password" })}
              />
              {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Hiển thị lỗi */}
            <div className="for-pass">
              <a href="#">Forgot Password</a>
            </div>
            <div className="box-button-login">
              <button type="submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "LOGIN"}
              </button>
            </div>
            <Link to="/SignIn" style={{ color: "#4caf50" }}>
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
