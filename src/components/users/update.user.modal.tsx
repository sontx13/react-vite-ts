import { Modal,Input,notification,Form, InputNumber, Select } from 'antd';
import {  useEffect } from 'react';
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
    const [form] = Form.useForm();
    const { Option } = Select;

    const {access_token,getData,isUpdateModalOpen,setIsUpdateModalOpen,dataUpdate,setIsDataUpdate} =props;

    //console.log("dataUpdate=="+JSON.stringify(dataUpdate));

    useEffect(() =>{
        if(dataUpdate){
          form.setFieldsValue({
            name:dataUpdate.name,
            email:dataUpdate.email,
            password:dataUpdate.password,
            age:dataUpdate.age,
            gender:dataUpdate.gender,
            address:dataUpdate.address,
            role:dataUpdate.role,
          })
        }
    },[dataUpdate])

    const hanleCloseModal = () =>{
        setIsDataUpdate(null);
        setIsUpdateModalOpen(false);
        form.resetFields();
    }

    const onFinish = async(values: any) => {
        console.log('Success:', values);

        const {name,email,password,age,gender,address,role} =values ;
       
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

    return (
          <Modal title="Update a User" open={isUpdateModalOpen} onOk={()=>form.submit()} onCancel={() =>  hanleCloseModal()} maskClosable={false} >
              <Form
                    name="basic"
                    onFinish={onFinish}
                    layout='vertical'
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your Age!' }]}
                    >
                        <InputNumber style={{width:"100%"}}/>
                    </Form.Item>
                    
                   
                   <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your Address!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                        >
                            <Option value="64ed9c6c1f393915ce25f4c8">USER</Option>
                            <Option value="64ed9c6c1f393915ce25f4c7">ADMIN</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
    )
}

export default UpdateUserModal