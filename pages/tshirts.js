import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose';
import Product from '@/models/Product';
const Tshirts = ({ products }) => {
  const router = useRouter();
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((item) => {
              return <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg cursor-pointer" onClick={() => router.push(`/product/${item.slug}`)}>
                <a className="block relative  rounded overflow-hidden">
                  <img alt="ecommerce" className=" md:h-[36vh] h-[30vh] block  m-auto" src={item.img} />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                  <p className="mt-1"><b>Rs.</b> {item.price}</p>
                  <p className='mt-l'>{item.size}</p>
                </div>
              </div>})}
          </div>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps() {
  if( !mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'tshirt' || 'tshirts'})
  return { props: {products: JSON.parse(JSON.stringify(products))  } }
}


export default Tshirts
