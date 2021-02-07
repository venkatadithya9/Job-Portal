
import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

export default class JobSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleSearch: "",
            jobs: [],
            datacopy: [],
            filterType: "None",
            flag: false,
            applied: []
        }

        this.onChangeTitleSearch = this.onChangeTitleSearch.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.buttonType = this.buttonType.bind(this);
        this.applying = this.applying.bind(this);
    }

    onChangeTitleSearch(event) {
        const titleSearch = event.target.value;
        this.setState(prevState => {
            const datacopy = prevState.jobs.filter(element => {
              return element.title.toLowerCase().includes(titleSearch.toLowerCase());
            });
      
            return {
              titleSearch,
              datacopy
            };
        });

    }

    applying(data) {
        this.setState({
            applied: data,
            flag:true
        });
    }

    handleFilterChange = changeEvent => {
        this.setState({filterType: changeEvent.target.value});
    }

    componentDidMount()
    {
        console.log("Entered Mount");

        const query = {
            searchQuery: this.state.titleSearch,
            sortBy: this.state.filterType
        }
        
        console.log(query);

        axios.get('http://localhost:5000/applicant/jobSearch')
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
                //console.log(err);
             });
             
        
        this.setState({titleSearch: ""});
    }

    buttonType(inp) {
        var appliedflag = false;
        var arr = inp.appEmails;
        arr.forEach(e => {
            if(localStorage.getItem("email") === e) appliedflag = true;
        });
        if(appliedflag)
        return <button className= "btn btn-success" disabled>Applied</button>
        else if(inp.status === "Available")
        return <button onClick={() => {this.applying(inp)}}>Apply</button>
        else if(inp.status === "Filled")
        return <button className= "btn btn-danger" disabled>Full</button>
       
    }

    render() {
        const display = this.state.datacopy.map(job => {
            

            return <tr>
                    <td>{job.title}</td>
                    <td>{job.nameOfRecruiter}</td>
                    <td>{job.salary}</td>
                    <td>{job.duration}</td>
                    <td>{job.deadline}</td>
                    <td>{job.typeOfJob}</td>
                    <td>{job.Recruiter_rating}</td>
                    <td>{this.buttonType(job)}</td>
                    </tr>

        })
        
        return(
            <div>
                        <div className="searchForm">
                        <form>
                            <label>Job Title: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.titleSearch}
                                   placeholder = "Search.."
                                   onChange={this.onChangeTitleSearch}
                                   />   
                    </form>
                    </div>
                    <div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Recruiter Name</th>
                        <th>Salary</th>
                        <th>Duration</th>
                        <th>Deadline</th>
                        <th>Job Type</th>
                        <th>Recruiter Rating</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
            {this.state.flag && <ApplyForJob applied={this.state.applied}/>}
            </div>
            </div>
        )
    }
}


class ApplyForJob extends React.Component {
    constructor(props) {
        console.log("Entered")
        super(props);
        this.state={
            sop:'',
            Applicant_name: '',
            flag: false
        }

        this.onChangeSop = this.onChangeSop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChangeSop(event) {
            this.setState({ sop: event.target.value});
    }

    componentDidMount() {
        console.log("Entered Did Mount");
        const obj = {email: localStorage.getItem("email")};

        axios.post("http://localhost:5000/applicant/profile", obj)
            .then( res => {
                if(res.data.status === "0") {
                    this.setState({
                        Applicant_name: res.data.applicant.name
                    });
                    console.log(res.data.applicant);
                }
                else{
                    console.log("error getting data");
                }
            })
            .catch(function(error){
                console.log(error);
            });
        
            /*axios.post('http://localhost:5000/applicant/updateApps', obj)
                 .then(response=> {
                    if(response.data.status === "0")
                    {
                        this.setState({
                            flag:true
                        });
                        console.log(response.applicant);
                    }
                    else{
                        alert(response.data.msg);
                    }
                 })
                 .catch(function(err) {
                     console.log(err);
                 })*/
    }

    onSubmit(e)
    {
        e.preventDefault();
        console.log("entered on submit");

        const newapply = {
            JobID: this.props.applied._id,
            Applicant_name: this.state.Applicant_name,
            Applicant_email: localStorage.getItem("email"),
            Recruiter_name: this.props.applied.nameOfRecruiter,
            Recruiter_email: this.props.applied.emailOfRecruiter,
            state: "Applied",
            sop: this.state.sop,
            jobTitle: this.props.applied.title
        }



            axios.post('http://localhost:5000/applicant/applyForJob', newapply)
                .then(res => {
                    if(res.data.status === "0") {
                        console.log("Success");
                        alert("Application Succesful!");
                        this.props.history.push("/Applicant/Dashboard");
                    }
                    else {
                        alert("Application failed");
                        this.props.history.push("/Applicant/Dashboard");
                    }
                })
                .catch(function(err)  {
                    console.log(err);
                });
        this.setState({
            sop:'',
            Applicant_name: '',
            flag: false
        });
    }

    render() {

     return(
            <div>
                <br></br><br></br>
                <p> Job Title: {this.props.applied.title}</p>
                <p> Recruiter Name: {this.props.applied.nameOfRecruiter}</p>
                <br></br><br></br>
                <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label>Statement Of Purpose (SOP): </label>
                            <input  type="text" 
                                    className="form-control" 
                                    value={this.state.sop}
                                    onChange={this.onChangeSop}
                                    />
                            </div>         
                        <div className="form-group">
                            <input type="submit" value="Apply" className="btn btn-primary" />
                        </div>
                    </form> 
            </div>
        )}
         
}

//change backend for filters, add more variables in this.state for additional inputs from filters

/*class RenderTable extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            flag: false,
            applied: []
        }
        this.applying = this.applying.bind(this);
        console.log(this.props.jobs);
    
    }
    applying (data) {
        this.setState({
            applied: data,
            flag:true
        });
    }
    

    render() {
        function buttonType(inp) {
            var appliedflag = false;
            var arr = inp.appEmails;
            arr.forEach(e => {
                if(localStorage.getItem("email") === e) appliedflag = true;
            });
            if(appliedflag)
            return <button className= "btn btn-success" disabled>Applied</button>
            else if(inp.status === "Available")
            return <button onClick={() => {this.applying(inp)}}>Apply</button>
            else if(inp.status === "Filled")
            return <button className= "btn btn-danger" disabled>Full</button>
           
        }
        return(
            <div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Recruiter Name</th>
                        <th>Salary</th>
                        <th>Duration</th>
                        <th>Deadline</th>
                        <th>Job Type</th>
                        <th>Recruiter Rating</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { 
                    this.props.jobs.map((job, i) => {
                        return (
                            <tr id={i}>
                                <td>{job.title}</td>
                                <td>{job.nameOfRecruiter}</td>
                                <td>{job.salary}</td>
                                <td>{job.duration}</td>
                                <td>{job.deadline}</td>
                                <td>{job.typeOfJob}</td>
                                <td>{job.Recruiter_rating}</td>
                                <td>{buttonType(job)}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {this.state.showComponent && <ApplyForJob applied={this.state.applied}/>}
            </div>
        )
    }
}*/

