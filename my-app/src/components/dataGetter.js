import fileDownload from 'js-file-download'
import Axios from 'axios'
import axios from 'axios';

export const get_data = async(route, ip, backport)=>{
    var data;
    await fetch('http://'+ip+':'+backport+'/' + route)
        .then(response => response.json())
        .then(res => {
            if (res.data ){
                //console.log('DATA IN FUNCITON: ', res.data);
                data = res.data;
            }
        })
        return data;
}




export const download = async(file_, ip, backport) => {

    var data = {file:file_}


    var index_of_cut = file_.indexOf("~") + 1
    var newName = file_.substring(index_of_cut,file_.length)

    
    Axios({
        url:'http://'+ip+':'+backport+'/download',
        method: "POST",
        responseType : "blob",
        data:data

    }).then((res) => {
        console.log(res)
        fileDownload(res.data, newName)
    })

}


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





