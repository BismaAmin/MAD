import React, { createContext, useState, useContext } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Address save karne ke liye state
  const [savedAddress, setSavedAddress] = useState({ house: '', street: '', city: '' });
  
  // NAYA: Dark Mode ki global state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // NAYA: Registered users store karne ke liye
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // ---------- LOGIN ----------
  const login = async (email, password) => {
    // Registered users mein check karo
    const foundUser = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase().trim() &&
        u.password === password
    );

    if (!foundUser) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const userData = {
      email: foundUser.email,
      name: foundUser.name,
      isLoggedIn: true,
    };
    setUser(userData);
    return userData;
  };

  // ---------- SIGNUP ----------
  const signup = async (name, email, password) => {
    // Check karo ke email already registered hai ya nahi
    const existingUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (existingUser) {
      throw new Error('EMAIL_EXISTS');
    }

    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  // ---------- LOGOUT ----------
  const logout = async () => {
    setUser(null);
    setCart([]);
  };

  // ---------- UPDATE USER NAME ----------
  const updateUserName = (newName) => {
    setUser((prev) => (prev ? { ...prev, name: newName } : prev));
  };

  // ---------- UPDATE ADDRESS ----------
  const updateAddress = (newAddress) => {
    setSavedAddress(newAddress);
  };

  // ---------- TOGGLE DARK MODE ----------
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // ---------- ADD ORDER ----------
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  // ---------- ADD TO CART ----------
  const addToCart = async (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let newCart;

    if (existing) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {    //if adding not existing
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);                              //upd
  };

  // ---------- REMOVE FROM CART ----------
  const removeFromCart = async (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
  };

  // ---------- UPDATE QUANTITY ----------
  const updateQuantity = async (productId, delta) => {              //delta = 1 , -1
    const newCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(newCart);
  };

  // ---------- CLEAR CART ----------
  const clearCart = async () => {
    setCart([]);
  };

  // ---------- CALCULATE TOTALS ----------
  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);   //sum 0 se start
  };

  const getDiscount = () => {
    const subtotal = getSubtotal();
    return subtotal > 1200 ? subtotal * 0.2 : 0;        //con false dis 0
  };

  const getFinalTotal = () => {
    return getSubtotal() - getDiscount();
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        cart,
        orders,
        savedAddress,
        isDarkMode,       
        login,
        signup,
        logout,
        updateUserName,
        updateAddress,
        toggleDarkMode,   
        addOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        getDiscount,
        getFinalTotal,
      }}
    >
      {children}          
    </ShopContext.Provider>                 //children= scrs
  );
};

export const useShop = () => useContext(ShopContext);