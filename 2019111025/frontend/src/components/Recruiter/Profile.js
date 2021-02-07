import React, {Component} from 'react';
import axios from 'axios';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            contactNum: "",
            bio: "",
            ratind: ""
        }
    }
    componentDidMount()
    {
        const obj = {email: localStorage.getItem("email")};
        console.log(obj.email);

        axios.post("http://localhost:5000/recruiter/profile", obj)
            .then( res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    contactNum: res.data.contactNum,
                    bio: res.data.bio,
                    rating: res.data.rating
                });
            })
            .catch(function(error){
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h1>My Profile</h1>
                <div>
                    <p>Name: {this.state.name}</p>
                </div>
                <div>
                    <p>Email: {this.state.email}</p>
                </div>
                <div>
                    <p>Contact Number: {this.state.contactNum}</p>
                </div>
                <div>
                    <p>Bio: {this.state.bio}</p>
                </div>
                <div>
                    <p>Rating: {this.state.rating}</p>
                </div>
                <div>
                    <button type="button" onClick={() => {this.props.history.push("/Recruiter/Profile_edit")}}> Edit</button>
                </div>
            </div>
        )
    }
}