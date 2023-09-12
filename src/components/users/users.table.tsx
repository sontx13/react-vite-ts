import { useEffect, useState } from 'react';
// import '../../style/user.css'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface IUser{
    _id:string,
    email:string,
    name:string,
    role:string
}
const UserTable = () =>{
   
    const [listUser,setListUser]= useState([]);
    useEffect(()=>{
        //console.log(">>> check useEffect");
        getData()
    },[])

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
        const data = await res.json();
        console.log(">>> data==" +  JSON.stringify(data));

        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjRlZDljNmMxZjM5MzkxNWNlMjVmNGNkIiwibmFtZSI6IlRy4bqnbiBYdcOibiBTxqFuIiwiZW1haWwiOiJzb250eDEzQGdtYWlsLmNvbSIsInJvbGUiOnsiX2lkIjoiNjRlZDljNmMxZjM5MzkxNWNlMjVmNGM3IiwibmFtZSI6IlNVUEVSX0FETUlOIn0sImlhdCI6MTY5NDUyMzE3MSwiZXhwIjoxNjk0NjA5NTcxfQ.wxdhmeyH4XfDuets-0ymR-ZVFTbbdR1atDpe0QR3hIQ";

        const res_list_user = await fetch("http://localhost:8000/api/v1/users?current=1&pageSize=5",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
        });
        const d = await res_list_user.json();

        //console.log(">>> listUser==" +  JSON.stringify(d.data.result));

        setListUser(d.data.result);
        
    }

    console.log(">>> check re-reder"+JSON.stringify(listUser));

    const columns: ColumnsType<IUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text) => <a>{text}</a>,
        },
    ]
    return(
        <div>
            <h2>Table User</h2>
            <Table columns={columns} dataSource={listUser} rowKey={"_id"}/>
            {/* <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Role</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser.map((item:IUser)=> {
                            return(
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                </tr>
                            )
                        })
                    }
                 
                </tbody>
            </table> */}
        </div>
    )
}

export default UserTable;