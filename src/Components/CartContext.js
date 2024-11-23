import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Cập nhật số lượng sản phẩm (tăng hoặc giảm)
  const updateCartItem = (id, action) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: action === 'increase'
                ? item.quantity + 1  // Tăng số lượng
                : Math.max(1, item.quantity - 1),  // Giảm số lượng nhưng không dưới 1
            }
          : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeCartItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Xóa tất cả sản phẩm trong giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, removeCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
