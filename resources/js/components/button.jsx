import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

function Button() {
       
    const UserList = () => {
        const [users, setUsers] = useState([]);
      
        useEffect(() => {
          fetchData();
        }, []);
      
        const fetchData = async () => {
          fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
          .then(response => response.json())
          .then(data => console.log(data));

      
         // Move the console.log inside the component body
      };
      
    function hello(){
        console.log('dfs');
    }
    return (
       <div className="button-react">
        <button className="btn btn-primary" onClick={UserList}>
            Fllow
        </button>
       </div>
    );
}

export default Button;


