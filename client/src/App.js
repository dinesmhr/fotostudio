import './App.css';
import { Routes } from './routes/route';
import React, { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
const axios = require("axios");

export const appContext = React.createContext()

function App() {
  const [ isLoggedin, setisLoggedin ] = useState(false);
  
  // update log in status 
  const updateLoggedInStatus = () => {
    setisLoggedin(!isLoggedin)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins:100,300,400,500', 'Roboto:100,300,400,500', 'Yanone Kaffeesatz:200,300,400', 'Antonio']
      }
    });

    async function fetchData() {
      const url =  `http://localhost:5000/fotostudio/api/session/fetch/anonymous`;
      let results = await axios.get( url );

    }
    fetchData();
  }, []);
  
  return (
    <appContext.Provider value={ {isLoggedin, updateLoggedInStatus} }>
      <Routes />
    </appContext.Provider>
  );
}

export default App;
