import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login'
import SignUp from './components/signup';
import Dashboard from './components/dashbord';
import Hospital from './components/hospital';
import Apollo from '../src/components/apollo';
import HospitalLogin from './components/hospital_login';
import Fortics from '../src/components/Fortis';
import UpdatePass from '../src/components/updatepassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/hospitallogin" element ={<HospitalLogin />} />
        <Route path ="/apollohospital" element={<Apollo />}/>
        <Route path = '/forticshospital' element={<Fortics />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manipalhospital" element={<Hospital />}/>
        <Route path = '/updatepassword'element ={<UpdatePass />}/>
      </Routes>
    </Router>
  );
}

export default App;
