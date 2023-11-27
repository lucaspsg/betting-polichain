import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import CreateBet from './pages/CreateBet';
import MyBets from './pages/MyBets'; 
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/create-bet',
    element: <CreateBet />,
  },
  {
    path: '/my-bets',
    element: <MyBets />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
