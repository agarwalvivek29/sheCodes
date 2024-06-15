import './App.css'
import Landing from './Components/Landing'
import Ccdv from './Components/ccdv'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import { createBrowserRouter } from 'react-router-dom';
import Greencarbon from './Components/Greencarbon.jsx'
import CarbonFootprintCalculator from './Components/CarbonFootprintCalculator.jsx'
import Tokens from './Components/Tokens.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { dataActions } from './store/data-slice'

import "./App.css";
import Signup from './Components/Signup.jsx'
import ProjectRegistration from './Components/ProjectRegistration.jsx'
import MyTokens from './Components/MyTokens.jsx'

export const backendUrl = "http://localhost:8000";

function App() {
  const contracts = useSelector((state)=>state.data.contracts);
  const dispatch = useDispatch();

  const getContracts = async()=>{
    try{
      const response = await fetch(`${backendUrl}/contract/getAll`);
      const data = await response.json();
      console.log('data:', data);
      if(data.success){
        dispatch(dataActions.setContracts(data.contracts));
      }
    }
    catch(err){
      console.log('error:', err);
    }
  }

  useEffect(()=>{
    if(contracts.length === 0){
      getContracts();
    }
  },[]);

  const router = createBrowserRouter(

    createRoutesFromElements(
        <Route path='/' element = {<Layout />}>
        <Route path='' element={<Landing />} />
        <Route path='/token/:id' element={<Greencarbon />} />
        <Route path='/tokens' element={<Tokens />}/>
        <Route path='/calculate' element={<Ccdv />}/>
        <Route path='/educate' element={<CarbonFootprintCalculator />}/>
        {/* <Route path='/register' element={<Signup />} /> */}
        <Route path='/register' element={<ProjectRegistration />} />
        <Route path='/myBalance' element={<MyTokens />} />
      </Route>
    )
   )  

  return (
    <>
      <RouterProvider router = {router} />
    </>
  );
}

export default App;
