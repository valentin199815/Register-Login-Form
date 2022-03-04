import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/login';
import Register from './pages/register';
import Layout from './layout';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Register/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.render(<App/>, document.getElementById("root"));
