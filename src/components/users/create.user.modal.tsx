import { Modal,Input,notification,Form,Select, InputNumber } from 'antd';

interface IProps{
    access_token:string,
    getData:any,
    isCreateModalOpen:boolean,
    setIsCreateModalOpen: (v:boolean) => void;
}

const CreateUserModal = (props: IProps) => {
    const [form] = Form.useForm();

    const {access_token,getData,isCreateModalOpen,setIsCreateModalOpen} =props;

    const hanleCloseModal = () =>{
        form.resetFields();
        setIsCreateModalOpen(false);
    }

    const onFinish = async(values: any) => {
        console.log('Success:', values);

        const {name,email,password,age,gender,address,role} =values ;
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
        console.log(">>> data_user==" +  JSON.stringify(data_user.data.result));
    };
    const { Option } = Select;

    return (
          <Modal title="Add new User" open={isCreateModalOpen} onOk={()=>form.submit()} onCancel={() =>  hanleCloseModal()} maskClosable={false} >
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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
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

export default CreateUserModal