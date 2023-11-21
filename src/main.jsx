import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Home.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Template from './Template.jsx';
import Home from './pages/Home.jsx';
import TenantConf from './pages/TenantConf.jsx';
import CompSelect from './pages/CompSelect.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Template />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"/tenant-conf",
        element:<TenantConf />
      },
      {
        path:"/competition-select",
        element:<CompSelect />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />

    </RouterProvider>
  </React.StrictMode>,
)
