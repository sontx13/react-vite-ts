import React from 'react'
import ReactDOM from 'react-dom/client'
import {  useState,useEffect } from 'react';
import App from './App.tsx';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import {  HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import UserPage from './screens/users.page.tsx';
import './App.scss';

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


const LayoutAdmin =  () => {

  const getData = async() =>{
      const res = await fetch("http://localhost:8000/api/v1/auth/login",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "sontx13@gmail.com",
                        password: "123456"
                    })
      });
      const d = await res.json();
      
      if(d.data){
        localStorage.setItem("access_token",d.data.access_token)
      }
  }
     

  useEffect(()=>{
    getData()
  },[])
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
