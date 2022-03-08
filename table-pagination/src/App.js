import React from 'react'
import {Route, Link, BrowserRouter, Routes, Outlet} from 'react-router-dom';
import User from './Router/User';
import Data from './Router/Data'

function App() {
  return (
    <BrowserRouter>
      <h1>Gmail style Checkbox</h1>
      <ul style={{padding:'10px', margin:'10px 20px'}}>
        <li>
          <Link to="/">Car</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
      <Routes>
        <Route path='/' element={<User />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
