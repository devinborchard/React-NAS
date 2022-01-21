import React, {Component} from 'react'
import FileUpload from '../FileUpload'
import Foot from '../Foot'
import Head from '../Head'

//Home component that will call all of there components on the page

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            ip : '000.000.0.00', //ip for the computer running the server
            back_port : '3001', //port you will be running the server on
        }
    }
    
    componentDidMount(){
        console.log('REACT WORKING');
    }

    render(){
        return(
            <div>
                {/* Header for page */}
                <Head/> 

                {/* main application component for page */}
                <FileUpload ip = {this.state.ip} back_port = {this.state.back_port}/>
                
                {/* Footer for page */}
                <Foot/>
            </div>
        )
    }

}

export default Home