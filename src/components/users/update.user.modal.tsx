import { Modal,Input,notification } from 'antd';
import {  useState,useEffect } from 'react';
import { IUser } from './users.table';

interface IProps{
    access_token:string,
    getData:any,
    isUpdateModalOpen:boolean,
    setIsUpdateModalOpen: (v:boolean) => void;
    dataUpdate:null|IUser;
    setIsDataUpdate:any;
}

const UpdateUserModal = (props: IProps) => {
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [age,setAge]= useState("");
    const [gender,setGender]= useState("");
    const [address,setAddress]= useState("");
    const [role,setRole]= useState("");

    const {access_token,getData,isUpdateModalOpen,setIsUpdateModalOpen,dataUpdate,setIsDataUpdate} =props;

    //console.log("dataUpdate=="+JSON.stringify(dataUpdate));

    useEffect(() =>{
        if(dataUpdate){
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
            setRole(dataUpdate.role);
        }
    },[dataUpdate])
    const handleOk = async () => {

        const data = {_id:dataUpdate?._id ,name,email,password,age,gender,address,role};
        console.log("data=="+JSON.stringify(data));

            const res_patch_user = await fetch("http://localhost:8000/api/v1/users",{
                method: "PATCH",
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
        const data_user = await res_patch_user.json();

        if(data_user.data){
            await getData();
            notification.success({
                message: "Sửa User thành công",
            })
            setIsUpdateModalOpen(false);
        }else{
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(data_user.message),
            })
        }
        //console.log(">>> data_user==" +  JSON.stringify(data_user.data.result));
    };

    const hanleCloseModal = () =>{
        const {setIsUpdateModalOpen} =props;
        setIsDataUpdate(null);
        setIsUpdateModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    }

    return (
          <Modal title="Update a User" open={isUpdateModalOpen} onOk={handleOk} onCancel={() =>  hanleCloseModal()} maskClosable={false} >
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
                        disabled
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)} 
                    ></Input>
               </div>
                <div>
                    <label>Password:</label>
                    <Input
                        disabled
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

export default UpdateUserModal