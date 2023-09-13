import { Modal,Input,notification } from 'antd';
import {  useState } from 'react';

interface IProps{
    access_token:string,
    getData:any,
    isCreateModalOpen:boolean,
    setIsCreateModalOpen: (v:boolean) => void;
}

const CreateUserModal = (props: IProps) => {
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [age,setAge]= useState("");
    const [gender,setGender]= useState("");
    const [address,setAddress]= useState("");
    const [role,setRole]= useState("");

    const {access_token,getData,isCreateModalOpen,setIsCreateModalOpen} =props;

    const handleOk = async () => {

        const data = {name,email,password,age,gender,address,role};
        console.log("data=="+JSON.stringify(data));

            const res_post_user = await fetch("http://localhost:8000/api/v1/users",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    ...data, "company":{
                        _id:"64e22b82bee5c6f0dd82ea13",
                        name:"Shopee"
                    }
                })
        });
        const data_user = await res_post_user.json();

        if(data_user.data){
            await getData();
            notification.success({
                message: "Tạo mới User thành công",
            })
            setIsCreateModalOpen(false);
        }else{
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(data_user.message),
            })
        }
        //console.log(">>> data_user==" +  JSON.stringify(data_user.data.result));
    };

    const hanleCloseModal = () =>{
        const {setIsCreateModalOpen} =props;
        setIsCreateModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    }

    return (
          <Modal title="Add new User" open={isCreateModalOpen} onOk={handleOk} onCancel={() =>  hanleCloseModal()} maskClosable={false} >
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
    )
}

export default CreateUserModal