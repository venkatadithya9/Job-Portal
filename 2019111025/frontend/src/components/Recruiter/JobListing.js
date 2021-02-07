
import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

export default class JobListings extends Component {
    constructor(props){
        super(props);
        this.state = {
            jobs: []
        }
        this.applyChanges = this.applyChanges.bind(this);
        this.jobsList = this.jobsList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.showApps = this.showApps.bind(this);
    }

    jobsList() {
        const obj = {email: localStorage.getItem("email")};

        axios.post('http://localhost:5000/recruiter/allJobs', obj)
             .then( reply => {
                if(reply.data.status === "0") {
                   this.setState({
                       jobs: reply.data.searchResults,
                   });
               }
               else {
                   console.log("error encountered");
               }
               })
            .catch(function(err) {
               alert("Search Failed! PLease retry");
            });
    }

    componentDidMount() {
        this.jobsList();
    }

    showApps(inp) {
        localStorage.setItem("jobID", inp._id);
        //this.props.history.push("/Recruiter/Jobapps");
    }

    handleChange (i,e) {
        let jobs = [...this.state.jobs];
        jobs[i][e.target.name] = e.target.value;
        this.setState({jobs});
    } 

    applyChanges(inp) {
        const newJob = {
            _id : inp._id,
            maxApps: inp.maxApps,
            maxPosns: inp.maxPosns
        }
        axios.post("http://localhost:5000/recruiter/jobUpdate", newJob)
            .then( res=> {
                if(res.data.status = "0") {
                    alert("Changes have been applied");
                }
                else alert("Changes could not be applied. Try again later");
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteJob(inp) {
        const obj = {_id: inp._id};
        axios.post("http://localhost:5000/recruiter/deletejob",obj)
            .then( res => 
                {  if(res.data.status==="1")
                    alert("Error in deleting");
                    else
                    this.jobsList();    
                })
            .catch(err=>{
                console.log(err);
            })
    }

    render() {
        const display = this.state.jobs.map((job,i) => {
            function setDate(inp){
                var date = new Date(inp);
                return date.toISOString().split("Z")[0]
            }

            return<div key ={i}>
                <br></br><br></br>
                <div>
                <p>Title: {job.title}</p>
                <p>Date of Posting: {job.dop}</p>
                <div>
                <label>Max Positions: </label>
                <input  type="number" 
                        className="form-control"
                        name = "maxPosns" 
                        value={job.maxPosns}
                        onChange={e => this.handleChange(i,e)}
                        required
                        />
                <label>Max Applications: </label>
                <input  type="number" 
                        className="form-control"
                        name = "maxApps" 
                        value={job.maxApps}
                        onChange={e => this.handleChange(i,e)}
                        required
                        />
                <label>Deadline: </label>
                <input  type="datetime-local" 
                        className="form-control"
                        name = "deadline" 
                        value={setDate(job.deadline)}
                        onChange={e => this.handleChange(i,e)}
                        required
                        />
                </div>
                <div><button className="btn btn-primary btn-sm" onClick ={()=>this.applyChanges(job)}>Apply Changes</button></div>
                <div><button className="btn btn-danger btn-sm" onClick ={() =>this.deleteJob(job)}>Delete Job</button></div>
                <div><button className="btn btn-secondary btn-sm" onClick={() => this.showApps(job)}>More details</button></div>
            </div>
            </div>
        });

        return (
        <div>
            <h4>Active Jobs</h4>
            <div>{display}</div>
        </div>
        )
    }
}