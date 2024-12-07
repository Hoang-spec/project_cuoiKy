import React, { useState, useEffect } from "react";
import "./admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeApi, setActiveApi] = useState(""); // API hiện tại (sản phẩm hoặc người dùng)
  const [activeSection, setActiveSection] = useState("products"); // Phần hiện tại (products/users)
  const [activeForm, setActiveForm] = useState(""); // Form hiện tại (add/edit/getAll)

  // Quản lý người dùng
  const [editUserId, setEditUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // Quản lý sản phẩm
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editProductId, setEditProductId] = useState(null);

  // API endpoints
  const apis = {
    api_user: "https://674c6f7354e1fca9290c8d3f.mockapi.io/users",
    api_watch: "https://672d7fa3fd897971564299a4.mockapi.io/product",
    api_laptop: "https://67492cfd5801f51535932c6d.mockapi.io/api/v1/laptops",
    api_smartphone: "https://6741a5e3e4647499008e57b0.mockapi.io/api/v1/Products",
    api_headphone: "https://6745b5c0512ddbd807f9480f.mockapi.io/codelo/taiphone",
  };

  // Fetch dữ liệu ban đầu
  useEffect(() => {
    fetchData("api_watch");
  }, []);

  // Fetch dữ liệu từ API
  const fetchData = async (apiName) => {
    try {
      const response = await fetch(apis[apiName]);
      const data = await response.json();
      if (apiName === "api_user") {
        setUsers(data);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Chuyển đổi giữa các phần
  const switchSection = (section) => {
    setActiveSection(section);
    if (section === "products") {
      setActiveApi("api_watch");
      fetchData("api_watch");
    } else {
      fetchData("api_user");
    }
    setActiveForm("getAll");
  };

  // Chuyển đổi API sản phẩm
  const handleApiSwitch = (apiName) => {
    setActiveApi(apiName);
    fetchData(apiName);
    setActiveForm("getAll");
  };

  // Thêm người dùng
  const handleAddUser = async (e) => {
    e.preventDefault();
    const newUser = { name: userName, email: userEmail, phoneNumber: userPhone };

    try {
      const response = await fetch(apis.api_user, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchData("api_user");
        setUserName("");
        setUserEmail("");
        setUserPhone("");
      }
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  // Sửa người dùng
  const handleEditUser = async (e) => {
    e.preventDefault();
    const updatedUser = { name: userName, email: userEmail, phoneNumber: userPhone };

    try {
      const response = await fetch(`${apis.api_user}/${editUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        fetchData("api_user");
        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setActiveForm("getAll");
      }
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa người dùng:", error);
    }
  };

  // Xóa người dùng
  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        const response = await fetch(`${apis.api_user}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchData("api_user");
        }
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };

  // Thêm sản phẩm
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name: productName, description, price };

    try {
      const response = await fetch(apis[activeApi], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchData(activeApi);
        setProductName("");
        setDescription("");
        setPrice("");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  // Sửa sản phẩm
  const handleEditProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = { name: productName, description, price };

    try {
      const response = await fetch(`${apis[activeApi]}/${editProductId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        fetchData(activeApi);
        setProductName("");
        setDescription("");
        setPrice("");
        setActiveForm("getAll");
      }
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa sản phẩm:", error);
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(`${apis[activeApi]}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchData(activeApi);
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="admin">
      <div className="admin_nav">
        <button onClick={() => switchSection("products")}>Quản lý Sản phẩm</button>
        <button onClick={() => switchSection("users")}>Quản lý Người dùng</button>
      </div>

      {activeSection === "products" && (
        <div>
          <div className="admin_chon">
            <button onClick={() => handleApiSwitch("api_watch")}>Đồng hồ</button>
            <button onClick={() => handleApiSwitch("api_laptop")}>Laptop</button>
            <button onClick={() => handleApiSwitch("api_smartphone")}>Điện thoại</button>
            <button onClick={() => handleApiSwitch("api_headphone")}>Tai nghe</button>
            <button onClick={() => setActiveForm("addProduct")}>Thêm Sản phẩm</button>
          </div>

          <div className="admin_list">
            {activeForm === "getAll" &&
              products.map((product) => (
                <div key={product.id}>
                  <img style={{width : '100px'}} src={product.avatar}/>
                  <p style={{width : '300px'
                  }}>Tên: {product.name}</p>
                  <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                  <button
                    onClick={() => {
                      setEditProductId(product.id);
                      setProductName(product.name);
                      setDescription(product.description);
                      setPrice(product.price);
                      setActiveForm("editProduct");
                    }}
                  >
                    Sửa
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
      {activeSection === "products" && activeForm === "addProduct" && (
  <form className="add-product-form" onSubmit={handleAddProduct}>
    <h3>Thêm Sản Phẩm Mới</h3>
    <div>
      <label htmlFor="productName">Tên Sản Phẩm:</label>
      <input
        type="text"
        id="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="description">Mô Tả:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="price">Giá:</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
    </div>
    <button type="submit">Thêm Sản Phẩm</button>
    <button type="button" onClick={() => setActiveForm("getAll")}>
      Hủy
    </button>
  </form>
)}
{activeSection === "users" && activeForm === "addUser" && (
  <form className="add-user-form" onSubmit={handleAddUser}>
    <h3>Thêm Người Dùng Mới</h3>
    <div>
      <label htmlFor="userName">Tên Người Dùng:</label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="userEmail">Email:</label>
      <input
        type="email"
        id="userEmail"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="userPhone">Số Điện Thoại:</label>
      <input
        type="tel"
        id="userPhone"
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
        required
      />
    </div>
    <button type="submit">Thêm Người Dùng</button>
    <button type="button" onClick={() => setActiveForm("getAll")}>
      Hủy
    </button>
  </form>
)}


      {activeForm === "editProduct" && (
  <div className="edit-product-form">
    <h3>Chỉnh sửa Sản phẩm</h3>
    <form onSubmit={handleEditProduct}>
      <div>
        <label>Tên sản phẩm:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mô tả:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Giá:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Cập nhật</button>
      <button type="button" onClick={() => setActiveForm("getAll")}>
        Hủy
      </button>
    </form>
  </div>
)}


      {activeSection === "users" && (
        <div>
          <div className="admin_chon">
            <button onClick={() => setActiveForm("addUser")}>Thêm Người dùng</button>
          </div>

          <div className="admin_list">
            {activeForm === "getAll" &&
              users.map((user) => (
                <div key={user.id}>
                  <p style={{width : '200px'}}>Tên: {user.name}</p>
                  <p style={{width : '200px'}}>Email : {user.email}</p>
                  <p style={{width : '200px'}}>Password : {user.password}</p>
                  <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                 
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
