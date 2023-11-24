import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login/"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  // {
  //   path: "/auth",
  //   element: <Login/>
  // },
  // {
  //   path: "/home",
  //   element: <Home/>
  // },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
