import React, {Component} from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

//import Profile from "./Profile"
import ProfileEdit from "./Profile_edit"
import JobSearch from "./Dashboard"
import MyApplications from "./MyApplications"
import Home from "../Common/Home"

export default class ApplicantHome extends Component 
{
    render() 
    {
        return (
            <div>
                <Router>
                    <div className="HomePage">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="navbar-item">
                                        <Link to="/Applicant/Profile" className="nav-link">My Profile</Link>
                                        <Link to="/Applicant/Dashboard" className="nav-link">Dashboard</Link>
                                        <Link to="/Applicant/MyApplications" className="nav-link">My Applications</Link>
                                        <a href="/" className="nav-link">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <br/>
                        <Route path="/Applicant/Profile" exact component={ProfileEdit} />
                        <Route path="/Applicant/Dashboard" exact component={JobSearch} />
                        <Route path="/Applicant/MyApplications" exact component={MyApplications} />
                        <Route path="/" exact component={Home}/>
                        
                    </div>
                </Router>
            </div>
        )
    }
}