import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    //eslint-disable-next-line
  }, [])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt=0;
    let keys=Object.keys(myCart);
    for (let index = 0; index<keys.length; index++) {
      subt += myCart[keys[index]].price * myCart[keys[index]].qty;
    }
    setSubTotal(subt);
  }
  const addToCart = (itemCode, qty, price, size, name, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, size, name, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  }
  const removeFromCart = (itemCode, qty, price, size, name, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  }
  const clearCart = () => {
    setCart({});
    saveCart({});
  }
  return <>
    <Head>
      <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0" />
    </Head>
    <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
    <Footer />
  </>
}
