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
import ManageShop from './Pages/Dashboard/ManageShop/ManageShop';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductManagement from './Pages/Dashboard/ProductManagement/ProductManagement';
import SalesCollection from './Pages/Dashboard/SalesCollection/SalesCollection';
import CheckOut from './Pages/Dashboard/CheckOut/CheckOut';
import SubscriptionAndPayment from './Pages/Dashboard/SubscriptionAndPayment/SubscriptionAndPayment';
import SalesSummary from './Pages/Dashboard/SalesSummary/SalesSummary';
import AddProduct from './Pages/Dashboard/ProductManagement/AddProduct';
import UpdateProduct from './Pages/Dashboard/ProductManagement/UpdateProduct';
import Payment from './Pages/Dashboard/Payment/Payment';

import { HelmetProvider } from 'react-helmet-async';
import AdminSaleSummary from './Pages/Dashboard/AdminSaleSummary/AdminSaleSummary';
import AdminRoute from './AdminRoute/AdminRoute';
import ErrorPage from './ErrorPage/ErrorPage';
import ForbiddenPage from './ForbiddenPage/ForbiddenPage';
import ManagerRoute from './ManagerRoute/ManagerRoute';
import About from './Pages/Home/About/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement : <ErrorPage></ErrorPage>,
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
        path : "/about",
        element : <About></About>
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
      },
      {
        path : "/forbiddenAccess",
        element : <ForbiddenPage></ForbiddenPage>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [


      // admin related
      {
        path: "manageShop",
        element: <AdminRoute><ManageShop></ManageShop></AdminRoute>
      },
      {
        path: "AdminSaleSummery",
        element: <AdminRoute><AdminSaleSummary></AdminSaleSummary></AdminRoute>
      },

      // manager related 
      {
        path: "productManagement",
        element: <ManagerRoute><ProductManagement></ProductManagement></ManagerRoute>
      },
      {
        path: "addProduct",
        element: <ManagerRoute><AddProduct></AddProduct></ManagerRoute>
      },
      {
        path: "updateProduct/:id",
        element: <ManagerRoute><UpdateProduct></UpdateProduct></ManagerRoute>
      }
      ,
      {
        path: "payment/:id",
        element: <ManagerRoute><Payment></Payment></ManagerRoute>
      }
      ,
      {
        path: "salesCollection",
        element: <ManagerRoute><SalesCollection></SalesCollection></ManagerRoute>
      },
      {
        path: "checkOut",
        element: <ManagerRoute><CheckOut></CheckOut></ManagerRoute>
      },
      {
        path: "subscriptionAndPayment",
        element: <ManagerRoute><SubscriptionAndPayment></SubscriptionAndPayment></ManagerRoute>
      },
      {
        path: "salesSummary",
        element: <ManagerRoute><SalesSummary></SalesSummary></ManagerRoute>
      }
    ]
  }
]);

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
