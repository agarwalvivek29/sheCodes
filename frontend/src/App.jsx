import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './Components/Landing'
import Ccdv from './Components/ccdv'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
    <Ccdv />
    </>
  )
}

export default App
