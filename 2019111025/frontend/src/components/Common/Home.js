import React, {Component} from 'react';
import axios from 'axios';
import Navbar from '../templates/Navbar'

var string = "MyString"

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {
        this.setState({
            name: 'Vikrant'
        })
    }

    componentDidUpdate() {
        if(this.state.name != 'Adithya')
        this.setState({
            name: 'Adithya'
        })
    }

    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>
                <Navbar/>
           </div>
        )
    }
}