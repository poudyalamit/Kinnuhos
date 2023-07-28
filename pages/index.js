import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div>
        <img src="https://tse2.mm.bing.net/th?id=OIP.ajHR9Viocw1TiSg3cr6VmwHaD4&pid=Api&P=0&h=220" height="100vh" width="100%" alt="hey" />
      </div>
      <Footer/>
    </div>
  )
}
