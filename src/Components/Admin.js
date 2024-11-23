import React, { useState, useEffect } from "react";
import "../admin.css"

const Admin = () => {
  // State quản lý các giá trị của input và danh sách sản phẩm
  const [productName, setProductName] = useState(""); // Tên sản phẩm
  const [description, setDescription] = useState(""); // Mô tả sản phẩm
  const [price, setPrice] = useState(""); // Giá sản phẩm
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
  const [searchedProduct, setSearchedProduct] = useState(null); // Sản phẩm tìm kiếm được
  const [searchName, setSearchName] = useState(""); // Tên sản phẩm để tìm kiếm
  const [activeForm, setActiveForm] = useState(""); // Theo dõi form đang hiển thị (add, edit, getAll)


  // Hàm chuyển đổi giữa các form (Thêm, Sửa, Lấy danh sách)
  const handleFormSwitch = (formName) => {
    setActiveForm(formName); // Cập nhật form đang hiển thị
  };

  // Hàm lấy danh sách sản phẩm từ MockAPI
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://672c05c31600dda5a9f70d59.mockapi.io/datit/product"
      );
      const data = await response.json();
      setProducts(data); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm thêm sản phẩm mới
  const handleAddProduct = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi reload mặc định của form
    const newProduct = { name: productName, description, price };
    try {
      const response = await fetch(
        "https://672c05c31600dda5a9f70d59.mockapi.io/datit/product",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct), // Gửi dữ liệu sản phẩm mới
        }
      );
      if (response.ok) {
        fetchProducts(); // Cập nhật danh sách sản phẩm sau khi thêm thành công
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
    // Reset giá trị các input
    setProductName("");
    setDescription("");
    setPrice("");
  };

  // Hàm tìm kiếm sản phẩm theo tên
  const handleSearchProduct = (e) => {
    e.preventDefault();
    const product = products.find(
      (p) => p.name.toLowerCase() === searchName.toLowerCase()
    );
    if (product) {
      setSearchedProduct(product); // Lưu thông tin sản phẩm tìm thấy
    } else {
      alert("Không tìm thấy sản phẩm!");
    }
  };

  // Hàm cập nhật thông tin sản phẩm
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (searchedProduct) {
      const updatedProduct = {
        ...searchedProduct,
        name: productName,
        description,
        price,
      };
      try {
        const response = await fetch(
          `https://672c05c31600dda5a9f70d59.mockapi.io/datit/product/${searchedProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct), // Gửi dữ liệu sản phẩm đã cập nhật
          }
        );
        if (response.ok) {
          fetchProducts(); // Lấy danh sách mới sau khi cập nhật
          // Reset các giá trị state
          setSearchedProduct(null);
          setProductName("");
          setDescription("");
          setPrice("");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
      }
    }
  };

  // Hàm xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(
          `https://672c05c31600dda5a9f70d59.mockapi.io/datit/product/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchProducts(); // Cập nhật danh sách sản phẩm sau khi xóa
          alert("Sản phẩm đã được xóa thành công!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Không thể xóa sản phẩm, vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="box-admin">
      {/* Thanh chọn chức năng */}
      <div className="box-choose">
        <button className="choose-add" onClick={() => handleFormSwitch("add")}>
          Thêm sản phẩm
        </button>
        <button
          className="choose-edit"
          onClick={() => handleFormSwitch("edit")}
        >
          Sửa sản phẩm
        </button>
        <button
          className="choose-getall"
          onClick={() => handleFormSwitch("getAll")}
        >
          Xem danh sách sản phẩm
        </button>
      </div>

      {/* Form Thêm sản phẩm */}
      {activeForm === "add" && (
        <form className="box-create" onSubmit={handleAddProduct}>
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

      {/* Form Tìm kiếm và Cập nhật sản phẩm */}
      {activeForm === "edit" && (
        <div>
          <form className="box-search" onSubmit={handleSearchProduct}>
            <h1>Tìm sản phẩm</h1>
            <label>Tên sản phẩm</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Nhập tên sản phẩm cần tìm"
            />
            <button type="submit">Tìm kiếm</button>
          </form>

          {searchedProduct && (
            <form className="box-update" onSubmit={handleUpdateProduct}>
              <h1>Cập nhật sản phẩm</h1>
              <label>Tên sản phẩm</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Cập nhật tên sản phẩm"
              />
              <label>Mô tả</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cập nhật mô tả sản phẩm"
              />
              <label>Giá</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Cập nhật giá sản phẩm"
              />
              <button type="submit">Cập nhật</button>
            </form>
          )}
        </div>
      )}

      {/* Danh sách sản phẩm */}
      {activeForm === "getAll" && (
        <div className="box-products">
          <h1>Danh sách sản phẩm</h1>
          {products.map((product) => (
            <div key={product.id}>
              <img className="img-product-admin" src={product.avatar} alt="" />
              <p>Tên: {product.name}</p>
              <p>Mô tả: {product.description}</p>
              <p>Giá: {product.price}</p>
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
  );
};

export default Admin;
