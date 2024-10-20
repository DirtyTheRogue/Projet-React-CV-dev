import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CVList from './components/cv/CVList';
import CreateCV from './components/cv/CreateCV';
import EditCV from './components/cv/EditCV';
import ViewCV from './components/cv/ViewCV';
import UserCVList from './components/cv/UserCVList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cvs" element={<CVList />} />
          <Route path="/cvs/user" element={<UserCVList />} />
          <Route path="/cv/create" element={<CreateCV />} />
          <Route path="/cv/edit/:id" element={<EditCV />} />
          <Route path="/cv/:id" element={<ViewCV />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;