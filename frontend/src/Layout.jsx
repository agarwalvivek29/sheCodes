import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'

function Layout() {
  return (
   <div className='w-[100vw] h-[100vh] flex flex-col justify-between'>
   <Navbar />
   <div className=''>
   <Outlet/>
   </div>
   <Footer />
   </div>
  )
}

export default Layout