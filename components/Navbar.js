import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { AiFillCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subtotal }) => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    } else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  return (
    <div className='flex flex-col md:flex-row  md:justify-start justify-center items-center  py-2 shadow-md'>
      <div className="logo mx-5">
        <Link href={'/'}><Image src={"/logo.png"} width={50} height={50} style={{ borderRadius: "50%" }} alt='' /></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link legacyBehavior href={'/tshirts'}><a><li>Tshirts</li></a></Link>
          <Link legacyBehavior href={'/hoodies'}><a><li>Hoodies</li></a></Link>
          <Link legacyBehavior href={'/stickers'}><a><li>Stickers</li></a></Link>
          <Link legacyBehavior href={'/mugs'}><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div onClick={toggleCart} className="cart absolute right-0 mx-5 top-4 cursor-pointer">
        <FaShoppingCart className='text-xl md:text-2xl' />
      </div>

      <div ref={ref} className="w-72 h-full sideCart absolute top-0 right-0 bg-green-100 px-8 py-10 transform transition-transform translate-x-full z-10">
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-green-600"><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 &&
            <div className='my-6 mx-2 font-semibold'>Your cart is Empty. </div>}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                <div className=' flex items-center font-semibold justify-center w-1/3 text-lg'>
                  <AiOutlineMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].size, cart[k].name, cart[k].variant)} className='cursor-pointer text-green-800' />
                  <span className='mx-2 text-sm'>{cart[k].qty}</span>
                  <AiOutlinePlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].size, cart[k].name, cart[k].variant)} className='cursor-pointer text-green-800' /></div>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex my-6">
          <button className="flex mx-2 text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-md"><BsFillBagCheckFill className='m-1' /> Checkout</button>
          <button className="flex mr-2 text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-md" onClick={clearCart}> Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
