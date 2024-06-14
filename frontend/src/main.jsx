import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import { createBrowserRouter } from 'react-router-dom';
import Landing from './Components/Landing.jsx'
import Greencarbon from './Components/Greencarbon.jsx'
import Ccdv from './Components/ccdv.jsx'
import Signup from './Components/Signup.jsx'
import CarbonFootprintCalculator from './Components/CarbonFootprintCalculator.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='' element={<Landing />} />
      <Route path='/explorer' element={<Greencarbon />} />
      <Route path='/learn' element={<Ccdv />}/>
      <Route path='/learn2' element={<CarbonFootprintCalculator />}/>
<Route path='/learn3' element={<Signup />}/>
    </Route>
  )
 )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router = {router} />
  </React.StrictMode>,
)
