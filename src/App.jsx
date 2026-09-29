import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './components/dashboardhLayout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Orders from './pages/Orders'
import Tasks from './pages/Tasks'
import  Settings  from './pages/Settings'
import CustomerDetails from './pages/CustomerDetails'
import Products from './pages/Products'
import NotFound from './pages/Notfound'

const App = () => {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<DashboardLayout/>,
      children:[
        {
          index:true,
          element:<Dashboard/>
        },
        {
          path:'customers',
          element:<Customers/>
        },
        {
          path:'customers/:id',
          element:<CustomerDetails/>
        },
        {
          path:'products',
          element:<Products/>
        },
        {
          path:'orders',
          element:<Orders/>
        },
        {
          path:'tasks',
          element:<Tasks/>
        },
        {
          path:'settings',
          element:<Settings/>
        },
        {
          path:'*',
          element:<NotFound/>
        }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App