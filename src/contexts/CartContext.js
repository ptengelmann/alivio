import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    const storedCart = localStorage.getItem('alivio_cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing stored cart:', error);
        localStorage.removeItem('alivio_cart');
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever items change
    localStorage.setItem('alivio_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, variant = null, quantity = 1) => {
    const cartItem = {
      id: `${product.id}-${variant?.id || 'default'}`,
      productId: product.id,
      title: product.title,
      handle: product.handle,
      variant: variant ? {
        id: variant.id,
        title: variant.title,
        price: variant.price,
        sku: variant.sku
      } : null,
      price: variant?.price || product.price || 0,
      quantity,
      image: product.featuredImage?.url || product.image,
      sku: variant?.sku || product.sku || `ALV-${product.id}`
    };

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === cartItem.id);

      if (existingItem) {
        // Update quantity if item already exists
        return currentItems.map(item =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...currentItems, cartItem];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShipping = () => {
    const subtotal = getSubtotal();
    return subtotal > 100 ? 0 : 15.99;
  };

  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getItemCount,
    getSubtotal,
    getShipping,
    getTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};