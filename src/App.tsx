import ToDoComponent from './todo/input.todo'
import {useState} from 'react'

function App() {

  const [count, setCount] = useState(1);
  const name = "props name";
  const age = 20;
  const address = {
    county:"VN",
    city:"HN"
  };

  const [listUser, setListUser] = useState(["user1","user2","user3","user4"]);

  const handleTest = (user:string) => {
    alert(`handleTest with user= ${user}`);
  } 

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={()=> setCount(count+1)}>Increase</button>
      <ToDoComponent name={name} age={age} address={address} handleTest={handleTest} listUser={listUser} setListUser={setListUser}/>
       <ul>
            {listUser.map((item,index) => {
            return(
                <li key={index}>{item}</li>
            )
            })}
        </ul>
    </div>
  )
}

export default App
