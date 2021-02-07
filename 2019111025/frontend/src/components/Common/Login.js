import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../templates/Navbar'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    componentDidMount() {
        localStorage.setItem("email", " ");
    }

    onSubmit(e) {
        e.preventDefault();

        const loggingUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/initial/login', loggingUser)
            .then(res => {
                if(res.data.status === "0"){
                    localStorage.setItem("email", loggingUser.email);
                    alert("Login Successful!");
                    //console.log(localStorage.getItem("email"));
                    if(res.data.user.typeOfUser === "Applicant")
                    {
                        this.props.history.push("/Applicant/Home");
                    }
                    else{
                        this.props.history.push("/Recruiter/Home");
                    }
                }
                else{
                    alert(res.data.msg);
                    console.log(res.status);
                }
            });
        
        this.setState({
            email: "",
            password: ""
        });
    }

    render() {
        return(
            <div>
                <Navbar/>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" 
                           className="form-control" 
                           value={this.state.email}
                           onChange={this.onChangeEmail}
                           />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" 
                           className="form-control" 
                           value={this.state.password}
                           onChange={this.onChangePassword}
                           />  
                </div>
                <div className="form-group"> 
                
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}