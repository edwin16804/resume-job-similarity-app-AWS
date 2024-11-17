import './App.css';
import { Routes, Route } from 'react-router-dom';
import Firstpagecontent from './components/FirstPage.js'; 
import Login from './components/login.js';
import Signup from './components/signup.js';
import Dashboard from './components/dashboard.js';



const App=()=> {
  return (  
    <div>
      <Routes>
        <Route path="/" element={<Firstpagecontent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </div>
  );
}

export default App;
