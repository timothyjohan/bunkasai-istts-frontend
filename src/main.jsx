import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Home.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Template from './Template.jsx';
import Home from './pages/Home.jsx';
import TenantConf from './pages/TenantConf.jsx';
import CompSelect from './pages/CompSelect.jsx';
import TenantForm from './pages/TenantForm.jsx';
import JsongForm from './pages/JsongForm.jsx';
import CoswalkForm from './pages/CoswalkForm.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';

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
        path:"/tenant-form",
        element:<TenantForm />
      },
      {
        path:"/competition-select",
        element:<CompSelect />
      },
      {
        path:"/jsong-form",
        element:<JsongForm />
      },
      {
        path:"/coswalk-form",
        element:<CoswalkForm />
      },
      {
        path:"/feedback-form",
        element:<FeedbackForm />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
          
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
