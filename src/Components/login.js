import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import user from "../images/pngtree-smiling-girl-point-up-with-fingers-png-image_8800296.png"; // Đảm bảo đường dẫn đúng
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
      // Gửi yêu cầu GET để lấy danh sách người dùng
      const response = await axios.get(
        "https://674c6f7354e1fca9290c8d3f.mockapi.io/users"
      );

      if (response.status === 200) {
        const users = response.data; // Danh sách người dùng từ server
        console.log(users);

        // Tìm user khớp với thông tin đã nhập
        const user = users.find((u) => {
          console.log(u);
          return u.name === data.name && u.password === data.password;
        });
        if (user.role === 1) {
          navigate("/Admin");
        } else if (user.role === 0) {
          // Đăng nhập thành công
          localStorage.setItem("token", user.token || "mockToken"); // Lưu token (nếu có)
          navigate("/"); // Điều hướng đến trang chính
        } else {
          // Sai tên đăng nhập hoặc mật khẩu
          setError("name", { message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }
      }
    } catch (error) {
      console.error("Error:", error); // Ghi log để debug
      setError("name", { message: "Lỗi máy chủ! Vui lòng thử lại sau." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="header-login">
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
