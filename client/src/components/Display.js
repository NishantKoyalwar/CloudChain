import { useState } from "react";
import { Image } from "react-bootstrap";
import "./Display.css"
var CryptoJS = require("crypto-js");



const Display = ({Contract,account})=>{
    const [data,setData] = useState("")
    
    

    const getdata = async ()=>{
       
        let dataArray;
       
        const otherAddress = document.querySelector(".address").value;
        
        if(otherAddress){
            dataArray =  await Contract.display(otherAddress)
            
        }else{
            dataArray = await  Contract.display(account)
        }
        const isEmpty = Object.keys(dataArray).length===0;
            if(!isEmpty){
                const str = dataArray.toString();
                const str_arr = str.split(",")
                console.log(str_arr)
                const images = str_arr.map((item,i)=>{
                    if(item.length===152){
                        var bytes  = CryptoJS.AES.decrypt(item.toString(), 'enter encrytion key');
                    var originalText = bytes.toString(CryptoJS.enc.Utf8);
                    return(
                        <Image src={originalText} fluid/>
                    )
                }else{
                    return(
                        <Image src={item} fluid/>
                    )

                }
                    
                })
            setData(images)
            }else{
                console.log("no files to display")
            }
    }

    return <>
        <div className="image-list" ></div>
        <input type="text" placeholder="Enter address" className="address"></input>
        <button className="center button" onClick={getdata}>
            GetData
        </button>
        {data}
    </>
}

export default Display;