import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import Root from "./routes/root";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ErrorPage from "./pages/error-page";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,  // This sets the default child route for /auth
            element: <Signup />,
          },
          {
            path: "/auth/signup",
            element: <Signup />,
          },
          {
            path: "/auth/signin",
            element: <Signin />,
          }
        ]
      }
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
