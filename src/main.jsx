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
        path : "/signUp",
        element : <SignUp></SignUp>
      },
      {
        path : "/dashboard",
        element : <Dashboard></Dashboard>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
