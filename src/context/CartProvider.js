"use client";
import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart && storedCart !== "undefined") {
      try {
        const parsed = JSON.parse(storedCart);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Không thể đọc giỏ hàng từ localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) return;
    const itemId =
      product.id ??
      product.product_id ??
      product.productId ??
      product.id_product ??
      product._id;

    const normalizedProduct = {
      ...product,
      id: itemId || `cart-item-${Date.now()}-${Math.random()}`,
      product_id: itemId || null,
      name: product.name ?? product.product_name ?? product.title ?? "Sản phẩm",
      price: product.price ?? product.sale_price ?? 0,
      image:
        product.image ||
        product.image_url ||
        product.images?.[0] ||
        product.img ||
        "",
      quantity: 1,
    };

    setCartItems((current) => {
      const existing = current.find((item) => item.id === normalizedProduct.id);
      if (existing) {
        return current.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [normalizedProduct, ...current];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((current) => current.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((current) =>
      current
        .map((item) => {
          if (item.id !== itemId) return item;
          if (quantity <= 0) return null;
          return { ...item, quantity };
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
    0
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cartItems, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
