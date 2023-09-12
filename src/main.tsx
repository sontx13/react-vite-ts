import React from 'react'
import ReactDOM from 'react-dom/client'
import {  useState } from 'react';
import App from './App.tsx';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import { AppstoreOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import UserPage from './screens/users.page.tsx';

const items: MenuProps['items'] = [
  {
    label: <Link to='/'>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to='/users'>Users</Link>,
    key: 'users',
    icon: <UserOutlined />,
  },

];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};


const LayoutAdmin = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <footer>footer</footer>
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children:[
      {
        index:true,
        element: <App/>,
      },
      {
        path: "users",
        element: <UserPage/>,
      },
      {
        path: "tracks",
        element: <div>manage tracks</div>,
      },
    ]
  }, 
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
