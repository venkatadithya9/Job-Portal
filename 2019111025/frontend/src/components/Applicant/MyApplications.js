
import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

export default class MyApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: []
        }
    }
    
    componentDidMount() {
        console.log("Enter Mount");
        const obj = {email: localStorage.getItem("email")};

        axios.post("http://localhost:5000/applicant/myapps", obj)
            .then( res => {
                if(res.data.status === "0") {
                    console.log(res.data.final);
                    this.setState({
                        apps: res.data.final
                    });
                }
                else{
                    console.log("could not retrieve application");
                }
                
            })
            .catch(function(error){
                console.log(error);
            });

            
        
        /*this.state.apps.map(app => {
            console.log("Entered Map");
            const send = {
                JobID: app.JobID
            };
            console.log(send);
            axios.post("http://localhost:5000/applicant/findJob", send)
                 .then( res => {
                    if(res.data.status === "0")
                    {
                        console.log("Found info");
                        console.log(res.data.info);
                        app.salary= res.data.info.salary;
                        app.dop= res.data.info.dop;

                        //app = Object.assign(add,app);
                    }
                 })
                 .catch(function(err) {
                     console.log(err);
                 });
            
            
        })*/
    }
    
    render() {
        const display = this.state.apps.map((app, i) => {
            

            return <tr id = {i}>
                    <td>{app.jobTitle}</td>
                    <td>{app.Recruiter_name}</td>
                    <td>{app.Recruiter_email}</td>
                    <td>{app.salary}</td>
                    <td>{app.dop}</td>
                    <td>{app.state}</td>
                    <td></td>
                    </tr>

        })
        return(
            <div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Recruiter Name</th>
                        <th>Recruiter Email</th>
                        <th>Salary</th>
                        <th>Date of Joining</th>
                        <th>Status</th>
                        <th>Rate Recruiter</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
            </div>
        )
    }

}