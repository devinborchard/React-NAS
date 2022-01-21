import fileDownload from 'js-file-download'
import Axios from 'axios'

//File to hold some extra funcitons that aid in retreiving or sending data
//to the back end server

//function to run a basic get request from any route
export const get_data = async(route, ip, backport)=>{
    var data;
    await fetch('http://'+ip+':'+backport+'/' + route)
        .then(response => response.json())
        .then(res => {
            if (res.data ){
                data = res.data;
            }
        })
    return data;
}

//function to trigger a file download from a given file name
export const download = async(file_, ip, backport) => {

    var data = {file:file_}

    //remove the enxtra file data in the file name
    var index_of_cut = file_.indexOf("~") + 1 
    var newName = file_.substring(index_of_cut,file_.length)

    Axios({
        url:'http://'+ip+':'+backport+'/download',
        method: "POST",
        responseType : "blob", //important for moving any file type
        data:data

    }).then((res) => {
        console.log(res)
        fileDownload(res.data, newName)
    })
}

//funcition to delete any file in the backends file directory
export const delete_ = async(file_, ip, backport) => {

    var data = {file:file_}

    await fetch('http://'+ip+':'+backport+'/delete',{
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
        data = res
    })
    return data
}





