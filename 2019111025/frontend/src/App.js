import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

//import UsersList from './components/Users/UsersList'
//import Home from './components/Common/Home'
import Login from './components/Common/Login'
import Register from './components/Common/Register'
//import Navbar from './components/templates/Navbar'
import Register_recruiter from './components/Common/Register_recruiter'
import Register_applicant from './components/Common/Register_applicant'
import ApplicantHome from './components/Applicant/Home'
import RecruiterHome from './components/Recruiter/Home'
import Home from './components/Common/Home'
//import Profile from './components/Users/Profile'

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/rec_register" exact component={Register_recruiter}/>
        <Route path="/appl_register" exact component={Register_applicant}/>
        <Route path="/Applicant/Home" exact component={ApplicantHome}/>
        <Route path="/Recruiter/Home" exact component={RecruiterHome}/>
      </div>
    </Router>
  );
}

export default App;
