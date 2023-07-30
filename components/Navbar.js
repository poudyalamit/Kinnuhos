import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row  md:justify-start justify-center items-center  py-2 shadow-md'>
      <div className="logo mx-5">
        <Link href={'/'}><Image src={"/logo.png"} width={50} height={50} style={{ borderRadius: "50%"}} alt=''/></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link legacyBehavior href={'/tshirts'}><a><li>Tshirts</li></a></Link>
          <Link legacyBehavior href={'/hoodies'}><a><li>Hoodies</li></a></Link>
          <Link legacyBehavior href={'/stickers'}><a><li>Stickers</li></a></Link>
          <Link legacyBehavior href={'/mugs'}><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 top-4">
        <FaShoppingCart className='text-xl md:text-2xl'/>
      </div>
    </div>
  )
}

export default Navbar
