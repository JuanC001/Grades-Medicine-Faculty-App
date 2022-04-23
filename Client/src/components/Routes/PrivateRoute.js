import React from 'react';
import {Redirect, Route, Routes} from 'react-router-dom';


export default function PrivateRoute(props) {
  
    const user = null;
    console.log(props);
  
    return (
      <Routes>
        <Route {...props}/>
      </Routes>
    
  )
}
