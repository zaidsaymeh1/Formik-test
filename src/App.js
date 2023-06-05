import React from "react";
import Layout from "./components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Product/Products";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";

let routs = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Products", element: <Products /> },
      { path: "register", element: <Register /> },
      { path: "Login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={routs}></RouterProvider>;
}
