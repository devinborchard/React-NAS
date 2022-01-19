import React, {Component} from 'react'
import axios from 'axios';
import Axios from 'axios'
import {get_data, download, delete_} from './dataGetter'
import fileDownload from 'js-file-download';




class FileUpload extends Component{

    constructor(props){
        super(props)
        this.state = {
            uploadSelectedFiles : [],
            SelectedFiles : [],
            files : [],
            ip: '192.168.0.11',
            back_port: '3001',

        }

    }
    
    componentDidMount(){
        this.getFiles()
    }


    onFileChange = event => {
        //console.log(event.target.files[0])
        
        // Update the state
        this.setState({ 
            uploadSelectedFiles: event.target.files,
        },
        //() => console.log(this.state.selectedFile)
        );
        
    };


    onFileUpload = (event) => {
        event.preventDefault();

        const data = new FormData();
        //data.append('file',this.state.selectedFiles,this.state.selectedFiles.name);
        //data.append('file',this.state.selectedFiles,this.state.selectedFiles.name);

        for(let i = 0; i < this.state.uploadSelectedFiles.length; i++){
            data.append('file',this.state.uploadSelectedFiles[i],this.state.uploadSelectedFiles[i].name);
        } 

        
        axios.post("http://"+this.state.ip+":"+this.state.back_port+"/uploadFile", data).then(()=>{
            this.getFiles()
        }).catch(e=>{
            console.error('Error: ',e)
        })
                
    };

    getFiles(){
        
        var data =  get_data('getFiles',this.state.ip,this.state.back_port)
        var selectedFile = []

        
        //console.log(selectedFile)
        Promise.resolve(data).then(function(data){

            for(let i = 0; i < data.length; i++){
                selectedFile.push(false)
            }
    
            this.setState({
                files: data,
                SelectedFiles: selectedFile,
            })

        }.bind(this));
        
    }

    downloadFiles(e){
        for(let i = 0; i< this.state.SelectedFiles.length ; i++){
            if(this.state.SelectedFiles[i]){
                download(this.state.files[i],this.state.ip,this.state.back_port)
            }
        
        }
    }

    deleteFiles(e){

        var startingNum = this.state.SelectedFiles.length
        var newFiles = []

        for(let i = 0; i< this.state.SelectedFiles.length ; i++){
            if(this.state.SelectedFiles[i]){
                delete_(this.state.files[i],this.state.ip,this.state.back_port)
            }else{
                newFiles.push(this.state.files[i])
            }
            startingNum = startingNum - 1
        }
        //this.getFiles()
        

        var newSelections = []
        for(let i = 0; i < newFiles.length; i++){
            newSelections.push(false)
        }
        console.log('new: ', newSelections)
        this.setState({
            SelectedFiles: newSelections,
            files: newFiles
        })
    }
  
    checked(e,index){
        var vals = this.state.SelectedFiles
        vals[index] = !this.state.SelectedFiles[index]

        this.setState({
            SelectedFiles: vals,
            
        })
    }


    render(){
        console.log('selected List: ', this.state.SelectedFiles)
        var fileList = this.state.files.map((element,index)=>{
            var index_of_cut = element.indexOf("~") + 1
            var itemName = element.substring(index_of_cut,element.length)
            
            var id_ = "item" + JSON.stringify(index)
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