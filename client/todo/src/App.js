
import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Todo from './Components/Todo/Todo';

function App() {
  return (
    <React.Fragment>
    <Router>
    <Routes>
    <Route path="/" element={<Todo/>} exact/>
    <Route path="/login" element={<Login/>} exact></Route>
    <Route path="/register" element={<Register/>} exact></Route>
    </Routes>
    </Router>
    </React.Fragment>
  );
}

export default App;
