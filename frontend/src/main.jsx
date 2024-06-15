import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/index.js'
import { Provider } from 'react-redux'

// const router = createBrowserRouter(

//   createRoutesFromElements(
//       <Route path='/' element = {<Layout />}>
//       <Route path='' element={<Landing />} />
//       <Route path='/token/:id' element={<Greencarbon />} />
//       <Route path='/tokens' element={<Tokens />}/>
//       <Route path='/calculate' element={<Ccdv />}/>
//       <Route path='/educate' element={<CarbonFootprintCalculator />}/>
//     </Route>
//   )
//  )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    <App />
    </Provider>

  </React.StrictMode>,
)
