import React, { useState, useEffect } from "react";
import "./admin.css"

const Admin = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [activeApi, setActiveApi] = useState(""); // Quản lý API hiện tại
  const [activeForm, setActiveForm] = useState("");
  const [editProductId, setEditProductId] = useState(null); // Quản lý sản phẩm đang chỉnh sửa

  // Danh sách các API
  const apis = {
    api1: "https://672d7fa3fd897971564299a4.mockapi.io/product",
    api2: "https://67492cfd5801f51535932c6d.mockapi.io/api/v1/laptops",
    api3: "https://6745b5c0512ddbd807f9480f.mockapi.io/codelo/taiphone",
    api4: "https://6741a5e3e4647499008e57b0.mockapi.io/api/v1/Products",
    api_user : "https://674c6f7354e1fca9290c8d3f.mockapi.io/users"
  };

  // Chuyển đổi giữa các API
  const handleApiSwitch = (apiName) => {
    setActiveApi(apiName);
    fetchProducts(apiName);
    setActiveForm("getAll");
  };

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async (apiName) => {
    try {
      const response = await fetch(apis[apiName]);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Thêm sản phẩm mới
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
        fetchProducts(activeApi);
        setProductName("");
        setDescription("");
        setPrice("");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

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
        fetchProducts(activeApi); // Cập nhật lại danh sách sản phẩm
        setProductName("");
        setDescription("");
        setPrice("");
        setActiveForm("getAll"); // Quay lại trang danh sách sản phẩm
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
          fetchProducts(activeApi);
          alert("Sản phẩm đã được xóa!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  // Xử lý khi nhấn nút "Sửa"
  const handleEditButtonClick = (product) => {
    setProductName(product.name);
    setDescription(product.description); // Chỉnh sửa trường description đúng
    setPrice(product.price);
    setEditProductId(product.id);
    setActiveForm("edit");
  };

  return (
    <div className="admin">
      <div className="admin_chon">
        <button onClick={() => handleApiSwitch("api1")} className="choose-watch">
          Hiển thị API Watch
        </button>
        <button onClick={() => handleApiSwitch("api2")} className="choose-laptop">
          Hiển thị API Laptop
        </button>
        <button onClick={() => handleApiSwitch("api4")} className="choose-smartphone">
          Hiển thị API Smartphone
        </button>
        <button onClick={() => handleApiSwitch("api3")} className="choose-headphone">
          Hiển thị API Headphone
        </button>
        <button className="choose-add" onClick={() => setActiveForm("add")}>
          Thêm sản phẩm
        </button>
      </div>

      <div className="admin_list">
        {activeForm === "add" && (
          <form className="admin_add" onSubmit={handleAddProduct}>
            <h1>Thêm sản phẩm</h1>
            <label>Tên sản phẩm</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
            />
            <label>Mô tả</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả sản phẩm"
            />
            <label>Giá</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Nhập giá sản phẩm"
            />
            <button type="submit">Thêm</button>
          </form>
        )}

        {activeForm === "edit" && (
          <form className="admin_edit" onSubmit={handleEditProduct}>
            <h1>Sửa sản phẩm</h1>
            <label>Tên sản phẩm</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
            />
            <label>Mô tả</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả sản phẩm"
            />
            <label>Giá</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Nhập giá sản phẩm"
            />
            <button type="submit">Cập nhật</button>
          </form>
        )}

        {activeForm === "getAll" && (
          <div className="box-products">
            <h1>Danh sách sản phẩm</h1>
            {products.map((product, index) => (
              <div key={product.id} className="admin_product">
                <h1 style={{ width: '50px', paddingLeft: '20px', fontSize: '18px' }}>
                  {index + 1}
                </h1> {/* Thêm số thứ tự tự động */}
                <img src={product.avatar} alt={product.name} />
                <h2>{product.name}</h2>
                <h3 style={{ fontSize: '18px' }}>{product.description}</h3> {/* Sửa 'des' thành 'description' */}
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 'auto',
                  paddingLeft: '20px',
                  color: 'red',
                }}>
                  {product.price.toLocaleString("vi-VN")}đ
                </h4>
                <button
                  onClick={() => handleEditButtonClick(product)}
                  className="edit-button"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="delete-button"
                >
                  Xóa
                </button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
