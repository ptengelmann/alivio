// /pages/_app.js - Fixed import path and global cursor setup

import "../styles/globals.css";
import CustomCursor from "../components/CustomCursor";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CustomCursor />
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}