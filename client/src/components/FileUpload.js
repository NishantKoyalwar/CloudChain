import axios from "axios";
import { useState } from "react";
import './FileUpload.css';
var CryptoJS = require("crypto-js");
const JWT = `enter your pinata JWT here`
const FileUpload =  ({Contract,account})=>{
    const [File,setFile] = useState(null);
    const [fileName,setFileName] = useState("No File Selected Yet")
    const handleSubmit = async (e)=>{
        e.preventDefault();
       
        if(File){
            try {
                const formData = new FormData();
                formData.append("file",File);

              
                const resFile = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",formData,{
                    maxBodyLength:"Infinity",
                    headers :{
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        'Authorization': JWT
                    }
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
                var cipherText = CryptoJS.AES.encrypt(ImgHash,'@Nishu').toString() //encryption
                Contract.add(account,cipherText)
                alert("Image Uploaded Successfully")
               setFileName("")
               setFile(null)


               
              
               
            }catch(e){
                alert("unable to upload image to pinata")
            }
        }

    }
    const retrieveFile = (e)=>{
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
         
    }
    return ([
        <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <div className="center-content">
        <div>
          <label htmlFor="file-upload" className="choose">
            Choose Image
          </label>
          <input
            disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          </div>
          <span className="textArea">Image:{fileName}</span>
          <button type="submit" className="upload" disabled={!File}>
            Upload File
          </button>
          </div>
        </form>
      </div>]
    )
};

export default FileUpload;