import React, {Component} from 'react';
import axios from 'axios';

export default class ProfileEdit extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            contactNum: '',
            bio:''
        }

        this.onChangeName = this.onChangeName.bind(this);
        //this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContactNum = this.onChangeContactNum.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        }
        
        onChangeName(event) {
            this.setState({ name: event.target.value });
        }
    
        onChangeContactNum(event) {
            this.setState({ contactNum: event.target.value });
        }
    
        onChangeBio(event) {
            this.setState({ bio: event.target.value });
        }

        componentDidMount()
        {
            var emailID = localStorage.getItem("email");
            const obj = {email: emailID};
    
            axios.post("http://localhost:5000/recruiter/profile", obj)
                .then( res => {
                    this.setState({
                        name: res.data.name,
                        contactNum: res.data.contactNum,
                        bio: res.data.bio
                    });
                })
                .catch(function(error){
                    console.log(error);
                })
        }

        onSubmit(e)
        {
            e.preventDefault();
            console.log("Entered onSubmit");
            var emailID = localStorage.getItem("email");
            const newRecruiter = {
                name: this.state.name,
                email: emailID,
                contactNum: this.state.contactNum,
                bio: this.state.bio
            }
            console.log(newRecruiter);

            axios.post('http://localhost:5000/recruiter/profile_edit', newRecruiter)
                .then( res => {
                    if(res.data.status === "1")
                    {
                        console.log(res.data.msg);
                    }
                    else
                    {
                        alert(res.data.msg);
                        this.props.history.push("/Recruiter/Profile");
                    }
                });

            /*this.setState({
                name: '',
                contactNum: '',
                bio:''
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
                            <input type="submit" value="Update" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )
        }

}