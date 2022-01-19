import React, {Component} from 'react'
import Head from './Head'
import Foot from './Foot'

import Home from './pages/Home'


class Base extends Component{

    constructor(props){
        super(props)

        this.state = {
            page : 'home',
            header : false,
        }
    }

    
    //navigation functions to set page state------------
    goHome = ()=> {
        this.setState({header : true,page : 'home'})
        console.log('go home')
    }
    

    render(){
        var currentPage
        if(this.state.page === 'home')
            currentPage = <Home permission = {this.state.permission} employee = {this.state.employee} ip = {this.state.ip} back_port = {this.state.back_port} directSecretPage = {this.goSecretPage}/>
       
        if(this.state.header){
            return(
                <div>
                    <Head 
                        directHome = {this.goHome}
                        directStartNewBuild = {this.goStartNewBuild}
                        directEndBuild = {this.goEndBuild}
                        directLogNewPo = {this.goLogNewPo}
                        directTableViewer = {this.goTableViewer}
                        directCloseBatch = {this.goCloseBatch}
                        directKPI = {this.goKPI}
                        directIPR = {this.goIPR}
                        directSales = {this.goSales}
                        directLogPowder = {this.goLogPowder}
                        directCatagorize = {this.goCatagorize}
                        directQuote =  {this.goQuote}
                        directSpares = {this.goSpares}
                        directPowder = {this.goPowder}
                        directCoC = {this.goCoC}
                        directBackup = {this.goBackup}
                        directPackingSlip = {this.goPackingSlip}
                        directSupplier = {this.goSupplier}

                        ip = {this.state.ip}
                        back_port = {this.state.back_port}
                        employee = {this.state.employee}
                    />
                    {currentPage}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Foot ip = {this.state.ip}
                    back_port = {this.state.back_port}/>
                </div>

            )
        }else{
            return(
                <>
                {currentPage}
                </>
            )
        }
    }
}

export default Base