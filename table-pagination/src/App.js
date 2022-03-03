import React from 'react'
import {Route, Link, BrowserRouter, Routes, Outlet} from 'react-router-dom';
import User from './Router/User';
import Data from './Router/Data'

function App() {
  return (
    <BrowserRouter>
      <h1>Select Data Redux Test</h1>
      <ul style={{padding:'10px', margin:'10px 20px'}}>
        <li>
          <Link to="/">Table</Link>
        </li>
        <li>
          <Link to="/data">Table</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
      <Routes>
        <Route path='/' element={<User />}/>
        <Route path='/data' element={<Data />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
