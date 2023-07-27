import axios from "axios";
import { useState } from "react";
import './FileUpload.css';
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiOWU1YzFiZS0yMGI2LTRiYjYtYTNjNi0zZmI2ZjdmZDRhNWMiLCJlbWFpbCI6Im5pc2hhbnRrb3lhbHdhckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMWMxMGRjNjI2NDEzZWZiY2JlZWUiLCJzY29wZWRLZXlTZWNyZXQiOiIyZDE0ODFmODY2OTQzMGNjZmEyMTFmZGMwOTBkZDZmOGFlYzFkNGU3NzE1ZGMxNTRlNDg5YjRiOTFjMTdmZTNjIiwiaWF0IjoxNjg5Nzk4NjAyfQ.pvN4DIE5VYSepHj5Wgmac1yczJxb8dCVPTTOu0bsr8E`
const FileUpload =  ({Contract,account,provider})=>{
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
                console.log(ImgHash)
               Contract.add(account,ImgHash)
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