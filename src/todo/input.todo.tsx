import {useState} from 'react'
//viet type
interface IProps{
    name:string,
    age:number,
    address:{
        county:string,
        city:string
    }
    optional?:string,
    handleTest: (value:string) => void,
    listUser: string[],
    setListUser: (value:string[]) => void,
}

const ToDoComponent = (props:IProps) => {

    const {name,age,handleTest,listUser,setListUser} = props;

    //bien state
    const [user, setUser] = useState("");
    

    //console.log("user==="+user);

    const handleClick = () =>{
        //handleTest(user);
        if(!user){
            alert("User rỗng");
            return
        }
       
        setListUser([...listUser,user]); //spread syntax
        setUser("");
    }
    return( 
        <div>
              <p>Add new user:{user}</p>
              <input type="text" 
                    id="userName"
                    value={user}
                    onChange={(event)=>{
                        setUser(event.target.value);
                    }}
                />
                &nbsp;&nbsp;
              <button onClick={()=> handleClick()}>Save</button>

              <p>Name props: {name}</p>
              <p>Age props: {age}</p>

             
        </div>
    )
}

export default ToDoComponent;