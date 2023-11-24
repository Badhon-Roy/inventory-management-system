import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import Home from './Pages/Home/Home/Home';
import CreateStore from './Pages/CreateStore/CreateStore/CreateStore';
import WatchDemo from './Pages/WatchDemo/WatchDemo/WatchDemo';
import Login from './Pages/Login/Login';
import AuthProvider from './AuthProvider/AuthProvider';
import SignUp from './Pages/SignUp/SignUp';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers';
import ManageShop from './Pages/Dashboard/ManageShop/ManageShop';
import SaleSummary from './Pages/Dashboard/SaleSummary/SaleSummary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductManagement from './Pages/Dashboard/ProductManagement/ProductManagement';
import SalesCollection from './Pages/Dashboard/SalesCollection/SalesCollection';
import CheckOut from './Pages/Dashboard/CheckOut/CheckOut';
import SubscriptionAndPayment from './Pages/Dashboard/SubscriptionAndPayment/SubscriptionAndPayment';
import SalesSummary from './Pages/Dashboard/SalesSummary/SalesSummary';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/createStore",
        element: <PrivateRoute><CreateStore></CreateStore></PrivateRoute>
      },
      {
        path: "/watchDemo",
        element: <WatchDemo></WatchDemo>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>
      },



      // admin related
      {
        path: "manageShop",
        element: <ManageShop></ManageShop>
      },
      {
        path: "saleSummery",
        element: <SaleSummary></SaleSummary>
      },

      // manager related 
      {
        path : "productManagement",
        element : <ProductManagement></ProductManagement>
      },
      {
        path : "salesCollection",
        element : <SalesCollection></SalesCollection>
      },
      {
        path : "checkOut",
        element : <CheckOut></CheckOut>
      },
      {
        path : "subscriptionAndPayment",
        element : <SubscriptionAndPayment></SubscriptionAndPayment>
      },
      {
        path : "salesSummary",
        element : <SalesSummary></SalesSummary>
      }
    ]
  }
]);

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
