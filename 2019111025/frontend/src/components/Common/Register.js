import React, {Component} from 'react';
//import ReactDOM from "react-dom";
import axios from 'axios';
import Navbar from '../templates/Navbar'

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            typeOfUser: ''
        }

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeTypeOfUser = this.onChangeTypeOfUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeTypeOfUser(event) {
        this.setState({ typeOfUser: event.target.value });
    }


    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            typeOfUser: this.state.typeOfUser
        }
        axios.post('http://localhost:5000/initial/register', newUser)
             .then(res => {
                 if(res.data.status === "0")
                 {
                    localStorage.setItem("email", newUser.email);
                    if(newUser.typeOfUser === "Applicant")
                    {
                        this.props.history.push("/appl_register");
                    }
                    else
                    {
                        this.props.history.push("/rec_register");
                    }
                 }
                 else
                 {
                    alert(res.data.msg);
                   
                 }
             })
             ;

        this.setState({
            email: '',
            password: '',
            typeOfUser: ''
        });
    }

    render() {
        return (
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
                    
                    <label>Type of User: </label>
                    <select id="type" onChange={this.onChangeTypeOfUser} value={this.state.typeOfUser}>
                        <option value="Select">Select</option>
                        <option value="Applicant">Applicant</option>
                        <option value="Recruiter">Recruiter</option>
                    </select>    
                    
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}