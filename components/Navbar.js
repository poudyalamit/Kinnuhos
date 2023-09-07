import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'

const Navbar = ({ logout, user ,cart, addToCart, removeFromCart, clearCart, subtotal }) => {
  const [drop, setDrop] =useState(false);
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
    <div className='flex flex-col md:flex-row  md:justify-start justify-center items-center  py-2 shadow-md sticky top-0 bg-white z-10'>
      <div className="logo mx-5 mr-20">
        <Link href={'/'}><Image src={"/logo.png"} width={50} height={50} style={{ borderRadius: "50%" }} alt='' /></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link legacyBehavior href={'/tshirts'}><span><li className='hover:text-green-600'>Tshirts</li></span></Link>
          <Link legacyBehavior href={'/hoodies'}><span><li className='hover:text-green-600'>Hoodies</li></span></Link>
          <Link legacyBehavior href={'/stickers'}><span><li className='hover:text-green-600'>Stickers</li></span></Link>
          <Link legacyBehavior href={'/mugs'}><span><li className='hover:text-green-600'>Mugs</li></span></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 top-4 cursor-pointer flex">
        <span onMouseOver={()=>{setDrop(true)}} onMouseLeave={()=>{setDrop(false)}} >
     { user.value &&<MdAccountCircle className=' mt-1 text-xl md:text-2xl mx-2'/> }
     { drop && <div className="absolute right-8  bg-white border shadow-lg top-7 rounded-md px-5 py-4 w-32" onMouseOver={()=>{setDrop(true)}} onMouseLeave={()=>{setDrop(false)}} >
      <ul>
        <Link href={'/myaccount'}><li className='py-1 hover:text-green-700 text-sm font-bold'>My Account</li></Link>
        <Link href={'/orders'}><li className='py-1 hover:text-green-700 text-sm font-bold'>Orders</li></Link>
        <span onClick={logout}> <li className='py-1 hover:text-green-700 text-sm font-bold'>Logout</li></span>
      </ul>
     </div>}
     </span>
       { !user.value && <Link href={'/login'}>  
       <button className='bg-green-500 hover:bg-green-700 text-white text-sm py-1 px-2 rounded-md mx-2 text-center'>Login</button>
       </Link> }
        <FaShoppingCart onClick={toggleCart} className='text-xl md:text-2xl  mt-1' />
      </div>

      <div ref={ref} className={`overflow-y-scroll w-72 h-[100vh] sideCart absolute top-0 right-0 bg-green-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length === 0 ? 'translate-x-full' : "translate-x-0"} z-10`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-green-600"><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 &&
            <div className='my-6 mx-2 font-semibold'>Your cart is Empty. </div>}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/3 font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                <div className=' flex items-center font-semibold justify-center w-1/3 text-lg'>
                  <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].size, cart[k].name, cart[k].variant)} className='cursor-pointer text-green-700' />
                  <span className='mx-2 text-sm'>{cart[k].qty}</span>
                  <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].size, cart[k].name, cart[k].variant)} className='cursor-pointer text-green-700' /></div>
              </div>
            </li>
          ))}
        </ol>
        <div className="font-bold m-2 " >Subtotal: Rs.{subtotal}</div>
        <div className="flex my-6">
          <Link href={'/checkout'}><button className="flex mr-2 text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-md"><BsFillBagCheckFill className='m-1' /> Checkout</button></Link>
          <button className="flex mr-2 text-white bg-green-500 border-0 py-2 px-1.5 focus:outline-none hover:bg-green-600 rounded text-md" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
