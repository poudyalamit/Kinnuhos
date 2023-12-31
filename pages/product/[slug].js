import Product from '@/models/Product';
import mongoose from 'mongoose';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page({ addToCart, products, variants, buy }) {

  const router = useRouter()
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState(products.color);
  const [size, setSize] = useState(products.size);
  const checkService = async () => {
    let pins = await fetch(`${process.env.Host}/api/pincode`);
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true)
      toast.success('Your Pincode is servicable!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      setService(false)
      toast.error('Sorry, Your Pincode is not servicable!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const onchange = (e) => {
    setPin(e.target.value);
  }

  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    window.location = url;
  }

return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer/>
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* eslint-disable-next-line */}
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={products.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Kinnuhos</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{products.title} ({products.size}/{products.color}) </h1>

            <p className="leading-relaxed">{products.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes("black") && Object.keys(variants['black']).includes(size) && <button onClick={() => { refreshVariant(size, 'black') }} className={`border-2 ${color === 'black' ? 'border-black' : 'border-gray-300'} bg-gray-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes("red") && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVariant(size, 'red') }} className={`border-2 ${color === 'red' ? 'border-black' : 'border-gray-300'} ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes("blue") && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'blue') }} className={`border-2 ${color === 'blue' ? 'border-black' : 'border-gray-300'} ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes("green") && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVariant(size, 'green') }} className={`border-2 ${color === 'green' ? 'border-black' : 'border-gray-300'} ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes("purple") && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVariant(size, 'purple') }} className={`border-2 ${color === 'purple' ? 'border-black' : 'border-gray-300'} ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(variants).includes("white") && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreshVariant(size, 'white') }} className={`border-2 ${color === 'white' ? 'border-black' : 'border-gray-300'} ml-1 bg-white-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10">
                    {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                    {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                    {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                    {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                    {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">Rs. {products.price}</span>
              <button onClick={() => { buy(slug, 1, products.price, products.size, products.title, products.color) }} className="flex ml-8 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded">Buy Now</button>
              <button className="flex ml-4 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded" onClick={() => { addToCart(slug, 1, products.price, products.size, products.title, products.color) }}>Add to Cart</button>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
            </div>
            <div className="pin mt-6 flex space-x-2 text-sm">
              <input className='px-2 border-2 border-gray-400 rounded-md' type="text" placeholder='Enter Your Pincode' onChange={onchange} />
              <button className='flex ml-14 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded' onClick={checkService}>Check</button>
            </div>

            {(service === true && service !== null) && <div className="text-green-700 text-sm mt-3">
              Yes! This pincode is servicable.
            </div>}
            {(service !== null && service === false) && <div className="text-red-700 text-sm mt-3">
              Sorry,We donot deliver to this pincode yet.
            </div>}
          </div>
        </div>
      </div>
    </section>
  </>
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: products.title, category: products.category })
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    } else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: {
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Page