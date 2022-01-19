import React, {Component} from 'react'


class Head extends Component{

    constructor(props){
        super(props)

        const isMobile = window.innerWidth

        this.state = {
            isMobile: isMobile,
        }
    }


    componentDidMount(){

    }



    render(){

    
        return(
            <div className = 'heading'>
                <h2>CUSTOM NETWORK ATTACHED STORAGE</h2>
            </div>
        )
        
        
    }
}

export default Head