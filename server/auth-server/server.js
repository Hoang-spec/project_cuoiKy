const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dữ liệu người dùng giả lập
const users = [{ username: "datdeptrai", password: "123" }];
const admin = [{ username: "admin", password: "123456" }];

// API kiểm tra admin
app.post("/api/admin", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!username || !password) {
    return res.status(400).json({ message: "Tên đăng nhập và mật khẩu không được để trống." });
  }

  // Xác minh tài khoản admin
  const adminUser = admin.find(
    (u) => u.username === username && u.password === password
  );

  if (adminUser) {
    return res.status(200).json({ message: "Đăng nhập admin thành công." });
  } else {
    return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu admin." });
  }
});

// Route GET cho trang chủ
app.get("/", (req, res) => {
  res.send("API đang chạy. Sử dụng các endpoint như /api/login, /api/register, /api/admin.");
  console.log(users); // In danh sách người dùng hiện tại (chỉ để kiểm tra, không nên làm trên môi trường thực tế)
});

// API đăng ký
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem username đã tồn tại hay chưa
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại." });
  }

  // Thêm người dùng mới
  users.push({ username, password });
  return res.status(201).json({ message: "Đăng ký thành công." });
});

// API đăng nhập người dùng
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Tên đăng nhập và mật khẩu không được để trống." });
  }

  // Tìm kiếm người dùng
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return res.status(200).json({ message: "Đăng nhập thành công." });
  } else {
    return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu." });
  }
});

// Xử lý lỗi server (middleware xử lý lỗi)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log lỗi chi tiết (chỉ cho developer)
  res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau." });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
