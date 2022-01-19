import React, {Component} from 'react'
import FileUpload from '../FileUpload'
import Foot from '../Foot'
import Head from '../Head'

//import DateEntry from '../DateEntry';
//import {loadTable} from '../loadTable' //temporary for creating OTD table


class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            newElement : '',
            list: [],
            ip : this.props.ip,
            back_port :this.props.back_port,
            employee : this.props.employee,
            permission : this.props.permission
        }
    }
    
    componentDidMount(){
        //loadTable() // temporary for creating OTD

        console.log('REACT WORKING');
        
        ///////////////////////
        
        ///////////////////////
       
    }

    
    


    

    render(){

        return(
            <div>
                <Head/>
                <FileUpload/>
                <Foot/>

            </div>
        )

    }

}

export default Home