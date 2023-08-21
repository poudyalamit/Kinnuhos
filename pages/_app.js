import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal, setSubTotal] = useState(0);
  const [key, setKey] = useState(0);
  const [user, setUser] = useState({ value: null });
  const router = useRouter();

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
    const token = localStorage.getItem("token");
    if (token !== null) {
      setUser({ value: token });
      setKey(Math.random())
    }
    //eslint-disable-next-line
  }, [router.query])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let index = 0; index < keys.length; index++) {
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
  const buy = (itemCode, qty, price, size, name, variant) => {
    saveCart({});
    let newCart = { itemCode: { qty, price, size, name, variant } };
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout')
  }
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null })
    setKey(Math.random())
  }
  return <>
    <Head>
      <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0" />
    </Head>
    <Navbar key={key} logout={logout} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
    <Component buy={buy} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
    <Footer />
  </>
}
