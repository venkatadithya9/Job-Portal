import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Profile from "./Profile"
import ProfileEdit from "./Profile_edit"
import Create_job from "./CreateJob"
import JobListing from "./JobListing"
import Home from "../Common/Home"

export default class RecruiterHome extends Component 
{
    render() 
    {
        return(
            <div>
                <Router>
                    <div className="HomePage">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="navbar-item">
                                        <Link to="/Recruiter/Profile" className="nav-link">My Profile</Link>
                                        <Link to="/Recruiter/CreateJob" className="nav-link">Create Job</Link>
                                        <Link to="/Recruiter/JobListing" className="nav-link">Active Jobs</Link>
                                        <a href="/" className="nav-link">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        
                        <Route path="/Recruiter/Profile" exact component={Profile} />
                        <Route path="/Recruiter/Profile_edit" exact component={ProfileEdit} />
                        <Route path="/Recruiter/CreateJob" exact component={Create_job}/>
                        <Route path="/Recruiter/JobListing" exact component={JobListing}/>
                        <Route path="/" exact component={Home}/>
                    </div>
                </Router>
            </div>
        )
    }
}