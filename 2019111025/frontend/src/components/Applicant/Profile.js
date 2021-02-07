import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            skills: "",
            rating: "",
            noOfApps: "",
            education: [{instName: "", stYear:"", endYear:""}]
        }
    }
    componentDidMount()
    {
        const obj = {email: localStorage.getItem("email")};

        axios.post("http://localhost:5000/applicant/profile", obj)
            .then( res => {
                this.setState({
                    name: res.data.name,
                    skills: res.data.skills,
                    rating: res.data.rating,
                    noOfApps: res.noOfApps,
                    education: res.data.education
                });
            })
            .catch(function(error){
                console.log(error);
            })
    }

    render() {
        const listItems = this.state.education.map((j,i) => {
            return<div key={i}>Institute Name: {j.instName}  Start Year: {j.stYear}  End Year: {j.endYear}</div>
        })
        return (
            <div>
                <h1>My Profile</h1>
                <div>
                    Name: {this.state.name}
                </div>
                <div>
                    Skills: {this.state.Skills}
                </div>
                <div>
                    Rating: {this.state.rating}
                </div>
                <div>
                    No of Application: {this.state.noOfApps}
                </div>
                <div>
                    <label>Education: </label>
                    {listItems}
                </div>
                <div>
                    <button type="button"> <Link to= "/Profile_edit"> Edit </Link></button>
                </div>
            </div>
        )
    }
}