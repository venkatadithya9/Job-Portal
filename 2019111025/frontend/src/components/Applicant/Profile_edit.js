import React, {Component} from 'react';
import axios from 'axios';


export default class ProfileEdit extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            skills: '',
            education: [{instName: "", stYear:"", endYear:""}]
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.handleChangeInstNAme = this.handleChangeInstNAme.bind(this);
        this.handleChangeStYear = this.handleChangeStYear.bind(this);
        this.handleChangeEndYear = this.handleChangeEndYear.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeSkills(event) {
        this.setState({ skills: event.target.value });
    }

    handleChangeInstNAme(i, event) {
        let education = [...this.state.education];
        education[i].instName = event.target.value;
        this.setState({ education });
    }
    handleChangeStYear(i, event) {
        let education = [...this.state.education];
        education[i].stYear = event.target.value;
        this.setState({ education });
    }
    handleChangeEndYear(i, event) {
        let education = [...this.state.education];
        education[i].endYear = event.target.value;
        this.setState({ education });
    }
    addClick() {
        this.setState(prevState => ({
          education: [...prevState.education, {  }]
        }));
    }
    removeClick(i) {
        let education = [...this.state.education];
        education.splice(i, 1);
        this.setState({ education });
    }

    componentDidMount()
    {
        console.log("entered didMount");
        const obj = {email: localStorage.getItem("email")};

        axios.post("http://localhost:5000/applicant/profile", obj)
            .then( res => {
                if(res.data.status === "0") {
                    this.setState({
                        name: res.data.applicant.name,
                        skills: res.data.applicant.skills,
                        education: res.data.applicant.education
                    });
                    console.log(res.data.applicant);
                }
                else{
                    console.log("error getting data");
                }
            })
            .catch(function(err){
                console.log(err);
            })
    }


    onSubmit(e)
        {
            e.preventDefault();
            var emailID = localStorage.getItem("email");
            const newApplicant = {
                name: this.state.name,
                email: emailID,
                skills: this.state.skills,
                education: this.state.education
            }
            
// need to update in the backend so need a different API endpoint 
            axios.post('http://localhost:5000/applicant/profile_edit', newApplicant)
                .then( res => {
                    if(res.data.msg === "1")
                    {
                        console.log("Update failed");
                    }
                    else
                    {
                        alert("Update Succesfull");
                        //this.props.history.push("/Applicant/Home");
                    }
                });


            /*this.setState({
                name: '',
                skills: '',
                education: ''
            });*/
        }

    render() {
        return (
            <div>
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
                        <label>Skills: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.skills}
                               onChange={this.onChangeSkills}
                               />  
                    </div>
                    <label>Education: </label>
                    {this.state.education.map((el,i) => (
                        <div key={i}>
                        <label>Institute Name:</label>
                            <input type="text" 
                                   className="form-control" 
                                   value={el.instName || ""}
                                   onChange={e => this.handleChangeInstNAme(i , e)}
                                   />  
                        <label>Start Year:</label>
                            <input type="text"
                                   className="form-control" 
                                   value={el.stYear || ""}
                                   onChange={e =>this.handleChangeStYear(i , e)}
                                   />  
                        <label>End Year:</label>
                            <input type="text"
                                   className="form-control" 
                                   value={el.endYear || ""}
                                   onChange={e=> this.handleChangeEndYear(i,e)}
                                   />
                            <input
                                type="button"
                                value="remove"
                                onClick={() => this.removeClick(i)}
                                />
                        </div>
                    ))}
                    <input type="button" value="add more" onClick={() => this.addClick()} />
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Apply Changes" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}