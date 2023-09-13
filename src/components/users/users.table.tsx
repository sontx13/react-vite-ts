import { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button,notification,Popconfirm,message  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';

export interface IUser{
    _id:string,
    name:string,
    email:string,
    password:string,
    age:string,
    gender:string,
    address:string,
    role:string,
}

const UserTable = () =>{
   
    const [listUser,setListUser]= useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [dataUpdate, setIsDataUpdate] = useState<null|IUser>(null);

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjRlZDljNmMxZjM5MzkxNWNlMjVmNGNkIiwibmFtZSI6IlRy4bqnbiBYdcOibiBTxqFuIiwiZW1haWwiOiJzb250eDEzQGdtYWlsLmNvbSIsInJvbGUiOnsiX2lkIjoiNjRlZDljNmMxZjM5MzkxNWNlMjVmNGM3IiwibmFtZSI6IlNVUEVSX0FETUlOIn0sImlhdCI6MTY5NDU2Njg1NCwiZXhwIjoxNjk0NjUzMjU0fQ.Xa-ug-JyZErwYlUJ612NBiuElOBFJNJ4FpwpCKrii2U";

    useEffect(()=>{
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

        const res_list_user = await fetch("http://localhost:8000/api/v1/users",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
        });
        const d = await res_list_user.json();

        if(!d.data){
            notification.error({
                message: JSON.stringify(d.manage)
            })
        }
        //console.log(">>> listUser==" +  JSON.stringify(d.data.result));

        setListUser(d.data.result);
    }

    const confirm = async (user:IUser) => {

        const res_delete_user = await fetch(`http://localhost:8000/api/v1/users/${user._id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
        });
        const data_user = await res_delete_user.json();
        if(data_user.data){
            await getData();
            notification.success({
                message: "Xoá User thành công",
            })
            setIsUpdateModalOpen(false);
        }else{
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(data_user.message),
            })
        }
        //message.success('Click on Yes');

        await getData();
    };

    const columns: ColumnsType<IUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
          {
            title: 'Action',
            render: (value,record) => {
                //console.log(">>> record==" +  JSON.stringify(record));
                return(
                    <div>
                        <Button type="default" onClick={()=>{
                            setIsDataUpdate(record);
                            setIsUpdateModalOpen(true);
                        }}>Edit</Button>

                          <Popconfirm
                            title="Delete the user"
                            description={`Are you sure to delete this user = ${record.name}?`}
                            onConfirm={()=>confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger style={{marginLeft:20}} >Delete</Button>
                        </Popconfirm>
                        
                    </div>
                )
            }
        },
    ]

    return(
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
            }}>
                <h2>Table User</h2>
                <div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={()=> setIsCreateModalOpen(true) }>Add User</Button>
                </div>
            </div>
            
            <Table columns={columns} dataSource={listUser} rowKey={"_id"}/>
            
            <CreateUserModal access_token={access_token} getData={getData} isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen}/>
            <UpdateUserModal access_token={access_token} getData={getData} isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen} dataUpdate={dataUpdate} setIsDataUpdate={setIsDataUpdate}/>
        </div>
    )
}

export default UserTable;