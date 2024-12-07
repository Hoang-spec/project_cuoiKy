import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import user from "../images/pngtree-smiling-girl-point-up-with-fingers-png-image_8800296.png";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);

    try {
      // Gọi API lấy danh sách người dùng
      const response = await axios.get(
        "https://674c6f7354e1fca9290c8d3f.mockapi.io/users"
      );

      if (response.status === 200) {
        const users = response.data;

        // Tìm user khớp với thông tin đăng nhập
        const user = users.find(
          (u) => u.name === data.name && u.password === data.password
        );

        if (user) {
          // Lưu thông tin user vào localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              phoneNumber: user.phoneNumber, // Token nếu có
            })
          );

          // Điều hướng dựa trên vai trò (role)
          if (user.role === 1) {
            navigate("/Admin"); // Admin
          } else {
            navigate("/"); // Người dùng thường
          }
        } else {
          // Nếu không tìm thấy user khớp
          setError("name", { message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("name", { message: "Lỗi máy chủ! Vui lòng thử lại sau." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="header-login" style={{backgroundColor : 'red',
      width : '1440px'
    }}>
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
              {...register("name", {
                required: "Vui lòng nhập Email hoặc Phone",
              })}
            />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
            )}
          </div>
          <div className="box-email-password">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Vui lòng nhập Password" })}
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password.message}</span>
            )}
          </div>
          <div className="for-pass">
            <Link to="/forgot-password">Forgot Password</Link>
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
  );
}

export default Login;
