// import logo from './logo.svg';
import './App.css';
import './custom.css';
import axios from 'axios';
import {useEffect,useState} from 'react'


function App() {
  const  [users, setUsers] = useState([])
  const [text, settext] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const loadUsers = async()=>{
      const response = await axios.get("http://www.mocky.io/v2/5ba8efb23100007200c2750c")
      // console.log(response.data)
      setUsers (response.data)
    }
    loadUsers();
  }, []);
  const onSuggestHandler = (text)=>{
    settext(text);
    setSuggestions([]);
  }
  const onChangeHandler = (text)=>{
    let matches = []
    if(text.length > 0){
      matches = users.filter(user=>{
        const regex = new RegExp(`${text}`,'gi');
        return user.name.match(regex)
      })
    }
    console.log('matches',matches)
    setSuggestions(matches)
    settext(text)
  }
  
  return (
    <>
     <div className="container">
       <input type="text"style={{marginTop:10}} className= 'placeIcon col-md-12' placeholder='&#xf002; search users by ID, address, name..'
       onChange={e=>onChangeHandler(e.target.value)}
       value={text}
       />
      {suggestions && suggestions.map((suggestions,i)=>
       <div key={i} className='suggestion col-md-12 justify-content-md-center' onClick={()=>onSuggestHandler(suggestions.name)}>{suggestions.id} <br /> {suggestions.name} <br /> {suggestions.items} {suggestions.address} {suggestions.pincode}</div>)}
    
       
     </div>
     
     
     
     
     
     </>


       
       

  
  );
}

export default App;
