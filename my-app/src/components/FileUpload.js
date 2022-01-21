import React, {Component} from 'react'
import axios from 'axios';
import {get_data, download, delete_} from './dataGetter'

//Main component of the application

class FileUpload extends Component{

    constructor(props){
        super(props)
        this.state = {
            uploadSelectedFiles : [], //holds mulitiple files before they are sent for storage
            SelectedFiles : [], //holds boolean values indexed with files to know if the file is selected
            files : [], //stores all files currenty in storage
            ip: this.props.ip,
            back_port: this.props.back_port,
        }
    }
    
    componentDidMount(){
        //run get files on mount to populate the users file list
        this.getFiles() 
    }

    onFileChange = event => {
        
        // Update the state of the selection list
        this.setState({ 
            uploadSelectedFiles: event.target.files,
        });
        
    };

    //triggers when the upload button is pressed after files have been imported by the user
    onFileUpload = (event) => {
        event.preventDefault();

        const data = new FormData();
        
        //add all the selected files to a data form for sending to the backend
        for(let i = 0; i < this.state.uploadSelectedFiles.length; i++){
            data.append('file',this.state.uploadSelectedFiles[i],this.state.uploadSelectedFiles[i].name);
        } 
        
        //send the form containing the files to the uploadFiles route
        axios.post("http://"+this.state.ip+":"+this.state.back_port+"/uploadFile", data).then(()=>{
            this.getFiles() //update the list after the files have been stored
        }).catch(e=>{
            console.error('Error: ',e)
        })       
    };

    //funtion to get all files currently stored and put them in lists so the user can see them
    getFiles(){
        
        //use get_data helper funciton to retreive the file data
        var data =  get_data('getFiles',this.state.ip,this.state.back_port)
        
        //create a new empty list for resetting the file selections
        var selectedFile = []
        Promise.resolve(data).then(function(data){

            //reset the file selections
            for(let i = 0; i < data.length; i++){
                selectedFile.push(false)
            }
    
            //update states
            this.setState({
                files: data,
                SelectedFiles: selectedFile,
            })

        }.bind(this));
        
    }

    //function to download all the files selected by the user
    downloadFiles(e){
        for(let i = 0; i< this.state.SelectedFiles.length ; i++){
            if(this.state.SelectedFiles[i]){
                //use the download helper function to download the files
                download(this.state.files[i],this.state.ip,this.state.back_port)
            }
        }
    }

    //funtion to delete all files selected by the user
    deleteFiles(e){

        var startingNum = this.state.SelectedFiles.length //keep track of the number of files left after deletion
        var newFiles = [] //container for the remaining file that are not deleted

        //loop through the list of booleans to see if a file is selected for deletion
        for(let i = 0; i< this.state.SelectedFiles.length ; i++){
            //if the file is selected delete it
            if(this.state.SelectedFiles[i]){
                delete_(this.state.files[i],this.state.ip,this.state.back_port)
            }
            //add the remaining files to a list to show what files remain in the system
            else{
                newFiles.push(this.state.files[i])
            }
            //keep a count of how many files are left
            startingNum = startingNum - 1
        }

        //create a new array for selected files that are all false because all selected values were deleted
        var newSelections = []
        for(let i = 0; i < newFiles.length; i++){
            newSelections.push(false)
        }

        //update states
        this.setState({
            SelectedFiles: newSelections,
            files: newFiles
        })
    }
  
    //update the check boxes that show if a file is selected
    checked(e,index){
        var vals = this.state.SelectedFiles
        vals[index] = !this.state.SelectedFiles[index]

        this.setState({
            SelectedFiles: vals,      
        })
    }

    render(){

        //create the list of files the user sees and can selected files from
        var fileList = this.state.files.map((element,index)=>{

            //remove extra data attached to the names of files
            var index_of_cut = element.indexOf("~") + 1
            var itemName = element.substring(index_of_cut,element.length)
            
            //create a row of a selection box and the file name for every file stored
            return(
                <tr>
                    <td>
                        <input 
                            type="checkbox" 
                             
                            value={this.state.SelectedFiles[index]}
                            checked = {this.state.SelectedFiles[index]}
                            onChange={ event => {
                                this.checked(event, index)
                            }}
                        ></input>
                    </td>
                    <td>
                        {itemName}
                    </td>
                </tr>
            )
        })

        //create the form for users to upload new files to the storage
        var fileUpload = (
            <div className = 'submissionDiv'>
            <table>
                <tr>
                    <td className = 'title' style = {{textAlign:'center'}}><h1>Files</h1></td>
                </tr>

                <tr><td style = {{textAlign:'center'}}>
                        <label>Upload Files</label>
                        <input type = "file" onChange = {this.onFileChange} multiple/>
                        <button className= 'button' onClick={this.onFileUpload}>Submit</button>
                </td></tr>

                <tr><td style = {{textAlign:'center'}}>
                    <button className= 'button' onClick={()=>this.getFiles()}>Refresh</button>
                    <button className= 'button' onClick={(e)=>this.downloadFiles(e)}>Download</button>
                    <button className= 'button' onClick={(e)=>this.deleteFiles(e)}>Delete</button>
                </td></tr>

            </table>
            </div>
        )


        return(
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '30vh'}}>
                <table>
                    <tbody>
                        <tr>
                            {fileUpload}
                        </tr>

                        <tr>
                            <div className = 'bodyDiv' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                            <table>
                            {fileList}
                            </table>
                            </div>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FileUpload