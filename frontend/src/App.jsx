import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get('https://funnyjokes-backend.onrender.com/api/jokes')
      .then((res) => setJokes(res.data))
      .catch((err) => console.error(err));
  }, []); // Adding the empty dependency array to avoid multiple API calls

  return (
    <>
      <div>
       <center> <h1>Aman Developer Group 😊</h1></center>
        {jokes.map((v, i) => (
          <div key={i}>
<h5>{v.title} :  {v.content}</h5>

          
          </div>
        ))}
       
      </div>
    </>
  );
}

export default App;
