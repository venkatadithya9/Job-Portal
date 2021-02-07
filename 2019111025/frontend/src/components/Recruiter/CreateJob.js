import React, {Component} from 'react';
import axios from 'axios';

export default class Create_job extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: "",
            nameOfRecruiter: "",
            emailOfRecruiter: "",
            maxApps: "",
            maxPosns: "",
            dop: "",
            deadline: "",
            reqSkills: "",
            typeOfJob: "",
            duration: "",
            salary: "",
            Recruiter_rating: ""
        }

        //this.onChangeName = this.onChangeName.bind(this);
        //this.onChangeEmail = this.onChangeEmail.bind(this);
        //this.onChangeContactNum = this.onChangeContactNum.bind(this);
        //this.onChangeBio = this.onChangeBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        }
        
        handleChange = e => {
            e.persist();
            this.setState({
                [e.target.name]: e.target.value
            });
        }

        componentDidMount() {
            const obj = {email: localStorage.getItem("email")};
    
            axios.post("http://localhost:5000/recruiter/profile", obj)
                .then( res => {
                    this.setState({
                        nameOfRecruiter: res.data.name,
                        emailOfRecruiter: res.data.email,
                        Recruiter_rating: res.data.rec_rating
                    });
                    console.log(res);
                    
                })
                .catch(function(error){
                    console.log(error);
                });
        }

        onSubmit(e)
        {
            e.preventDefault();

            //var rec_name,rec_email,rec_rating;
            console.log(localStorage.getItem("email"));
            
            

            //var emailID = localStorage.getItem("email");
            const newJob = {
                title: this.state.title,
                nameOfRecruiter: this.state.nameOfRecruiter,
                emailOfRecruiter: this.state.emailOfRecruiter,
                maxApps: this.state.maxApps,
                maxPosns: this.state.maxPosns,
                dop: this.state.dop,
                deadline: this.state.deadline,
                reqSkills: this.state.reqSkills,
                typeOfJob: this.state.typeOfJob,
                duration: this.state.duration,
                salary: this.state.salary,
                status: "Available",
                appsLeft: this.state.maxApps,
                Recruiter_rating: this.state.Recruiter_rating
            }
            //localStorage.clear();

            axios.post('http://localhost:5000/recruiter/addJobListing', newJob)
                .then( res => {
                    if(res.data.status === "1")
                    {
                        console.log("Job creation failed");
                    }
                    else
                    {
                        alert("Job Created Successfully!");
                        console.log("Success!");    
                    }
                });

            this.setState({
                title: "",
                //nameOfRecruiter
                //emailOfRecruiter: localStorage.getItem("email"),
                maxApps: "",
                maxPosns: "",
                dop: "",
                deadline: "",
                reqSkills: "",
                typeOfJob: "",
                duration: "",
                salary: ""
            });
        }

        render() {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Job Title: </label>
                            <input name="title"
                                   type="text" 
                                   className="form-control" 
                                   value={this.state.title}
                                   onChange={this.handleChange}
                                   required
                                   />
                        </div>
                        <div className="form-group">
                            <label>Max Applications: </label>
                            <input name="maxApps"
                                   type="number" 
                                   className="form-control" 
                                   value={this.state.maxApps}
                                   onChange={this.handleChange}
                                   required
                                   />
                        </div>
                        <div className="form-group">
                            <label>Max Positions: </label>
                            <input name="maxPosns"
                                   type="number"
                                   max={this.state.maxApps} 
                                   className="form-control" 
                                   value={this.state.maxPosns}
                                   onChange={this.handleChange}
                                   required
                                   />
                        </div>
                        <div className="form-group">
                            <label>Date of Posting: </label>
                            <input name = "dop"
                                   type="date" 
                                   className="form-control" 
                                   value={this.state.dop}
                                   onChange={this.handleChange}
                                   required
                                   />
                        </div>
                        <div className="form-group">
                            <label>Deadline: </label>
                            <input name="deadline"
                                   type="datetime-local"
                                   className="form-control" 
                                   value={this.state.deadline}
                                   onChange={this.handleChange}
                                   required
                                   />
                        </div>
                        <div className="form-group">
                            <label>Skills Required: </label>
                            <input name="reqSkills"
                                   type="text"
                                   className="form-control" 
                                   value={this.state.reqSkills}
                                   onChange={this.handleChange}
                                   />
                        </div>
                        <div className="form-group">
                            <label>Type Of Job: </label>
                            <select id="type" name="typeOfJob" onChange={this.handleChange} value={this.state.typeOfJob} required>
                                <option value="Select">Select</option>
                                <option value="Full-time">Full Time</option>
                                <option value="Part-time">Part Time</option>
                                <option value="WFH">Work From Home</option>
                            </select> 
                        </div>
                        <div className="form-group">
                            <label>Duration: </label>
                            <input name="duration"
                                   type="number"
                                   min="1" max="7"
                                   className="form-control" 
                                   value={this.state.duration}
                                   onChange={this.handleChange}
                                   required
                                   />
                        </div>
                        <div className="form-group">
                            <label>Salary: </label>
                            <input name="salary"
                                   type="number"
                                   className="form-control" 
                                   value={this.state.salary}
                                   onChange={this.handleChange}
                                   required
                                   />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add Job" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )
        }

}