import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

const Orders = ({ subtotal }) => {
  const router= useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
    //eslint-disable-next-line
  }, [router.query])
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5  mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">KINNUHOS</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #4456</h1>
            <p className="leading-relaxed mb-4">Your order has been placed successfully.</p>

            <div class="flex mb-4">
              <a class="flex-grow text-center  py-2 text-lg px-1">Item  Description</a>
              <a class="flex-grow text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
              <a class="flex-grow text-center border-gray-300 py-2 text-lg px-1">Item Total</a>

            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500"> Buy The Perfect(XL/Brown)</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">Rs. 499</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Buy The Perfect(XL/Brown)</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">Rs. 499</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Buy The Perfect(XL/Brown)</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">Rs. 499</span>
            </div>
            <div className="flex flex-col">
              <span className="title-font font-medium text-2xl text-gray-900">Subtotal: Rs.{subtotal}</span>
              <div className="my-6">
                <button className="flex mx-6 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Track Order</button>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line */}
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
        </div>
      </div>
    </section>
  )
}

export default Orders