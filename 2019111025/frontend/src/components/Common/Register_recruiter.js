import React, {Component} from 'react';
import axios from 'axios';
import Navbar from '../templates/Navbar'

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contactNum: '',
            bio: '',
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeContactNum = this.onChangeContactNum.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onChangeContactNum(event) {
        this.setState({contactNum: event.target.value});
    }

    onChangeBio(event) {
        this.setState({bio: event.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        console.log("Entered OnSubmit function");

        const newRecruiter = {
            name: this.state.name,
            email: localStorage.getItem("email"),
            contactNum: this.state.contactNum,
            bio: this.state.bio
        }

        console.log(newRecruiter);

        axios.post('http://localhost:5000/rec_register/', newRecruiter)
             .then(res => {
                 if(res.data.status === "0") {
                     alert("Registration Succesful! Head to Login Page");
                     console.log("Success");
                     localStorage.clear();
                     //this.props.history.push("http://localhost:3000/login");
                 }
                 else{
                     console.log("fail");
                 }
             })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Contact Number: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.contactNum}
                               onChange={this.onChangeContactNum}
                               />  
                    </div>
                    <div className="form-group">
                    
                        <label>Bio: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangeBio}
                               /> 
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}