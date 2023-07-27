import { useState } from "react";
//import "./Display.css"

const Display = ({Contract,account})=>{
    const [data,setData] = useState("")
    
    

    const getdata = async ()=>{
       
        let dataArray;
       
        const otherAddress = document.querySelector(".address").value;
        
        if(otherAddress){
            dataArray =  await Contract.display(account)
            
        }else{
            dataArray = await  Contract.display(account)
        }
       
       
        console.log(dataArray)

            const isEmpty = Object.keys(dataArray).length===0;
            if(!isEmpty){
                const str = dataArray.toString();
                const str_arr = str.split(",")
                console.log(str_arr)
                const images = str_arr.map((item,i)=>{
                    return(
                        <a href={item} key={i} target="_blank">
                            <img
                            key={i}
                            src={item}
                            alt="new"
                            className="image-list">

                            </img>
                        </a>
                    )
                })
            setData(images)
            }else{
                console.log("no files to display")
            }
    }

    return <>
        <div className="image-list">{data}</div>\
        <input type="text" placeholder="Enter address" className="address"></input>
        <button className="center button" onClick={getdata}>
            GetData
        </button>
    </>
}

export default Display;