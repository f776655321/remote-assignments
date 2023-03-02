import logo from './logo.svg';
import React,{useState}from 'react'
import './App.css';
import axios from './axios'
function App() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [result,setResult] = useState("")
  const handlesubmit = async()=>{
    try{
      var {data} = await axios.post('/users',{
        name,
        email,
        password,
      },{validateStatus: function (status) {
        return status < 500
      }})
      if(!data.error){
        setName("")
        setEmail("")
        setPassword("")
        setResult(JSON.stringify(data.user))
      }
      else{
        setResult(JSON.stringify(data))
      }
  }catch(error){
    console.log(error)
  }
  }
  return (
    <div className = "SignupWrapper">
      <input placeholder = "Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
      <input placeholder = "Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input placeholder = "Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={()=>{handlesubmit()}}>submit</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
