import { useEffect, useState } from 'react';
// import '../../style/user.css'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button,Modal,Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
interface IUser{
    _id:string,
    email:string,
    name:string,
    role:string
}
const UserTable = () =>{
   
    const [listUser,setListUser]= useState([]);

    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [age,setAge]= useState("");
    const [gender,setGender]= useState("");
    const [address,setAddress]= useState("");
    const [role,setRole]= useState("");

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
        //console.log(">>> data==" +  JSON.stringify(data));

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

    //console.log(">>> check re-reder"+JSON.stringify(listUser));

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const data = {name,email,password,age,gender,address,role}
        console.log("data=="+JSON.stringify(data))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return(
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
            }}>
                <h2>Table User</h2>
                <div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add User</Button>
                </div>
            </div>
            
            <Table columns={columns} dataSource={listUser} rowKey={"_id"}/>
            
            <Modal title="Add new User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false} >
               <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(event)=> setName(event.target.value)} 
                    ></Input>
               </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)} 
                    ></Input>
               </div>
                <div>
                    <label>Password:</label>
                    <Input
                        value={password}
                        onChange={(event)=> setPassword(event.target.value)} 
                    ></Input>
               </div>
                <div>
                    <label>Age:</label>
                    <Input
                        value={age}
                        onChange={(event)=> setAge(event.target.value)} 
                    ></Input>
               </div>
                <div>
                    <label>Gender:</label>
                    <Input
                        value={gender}
                        onChange={(event)=> setGender(event.target.value)} 
                    ></Input>
               </div>
                <div>
                    <label>Address:</label>
                    <Input
                        value={address}
                        onChange={(event)=> setAddress(event.target.value)} 
                    ></Input>
               </div>
                <div>
                    <label>Role:</label>
                    <Input
                        value={role}
                        onChange={(event)=> setRole(event.target.value)} 
                    ></Input>
               </div>
            </Modal>
        </div>
    )
}

export default UserTable;