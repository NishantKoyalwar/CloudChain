  import logo from './logo.svg';
  import './App.css';
  import FileUpload from './components/FileUpload'
  import Upload from './artifacts/contracts/Upload.sol/Upload.json'
  import {useState,useEffect} from "react"
  import modal from './components/modal'
  import { Button,Nav,Alert,Offcanvas } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Display from './components/Display';
  import { BrowserRouter,Switch,Route,Link } from 'react-router-dom';
  const { ethers,ethereum } = require("ethers")
  //useState is a hook which takes an argument which is initial value are returns an array two values i.e. the current state and function to update it
  //useEffect is a hook which allow you to perform functional components it could be data fetching etc.it runs after every render by default(u can also change this to ,render when values are changed)

  function App() {
    
    const [account,setAccount] = useState("")
    const [Contract,setContract] = useState(null)
    const [provider,setprovider] = useState(null)
    const [modalOpen,setModalOpen] = useState(false)
  
    useEffect(()=>{
      const provider = new ethers.BrowserProvider(window.ethereum);

      const loadProvider = async ()=>{
        if (provider){
          window.ethereum.on('accountsChanged',()=>{
            window.location.reload();
          });
          window.ethereum.on('chainChanged',()=>{
            window.location.reload();
          });
          
          try{
          await provider.send("eth_requestAccounts", []);
           const signer =  await provider.getSigner();
          const address = (await signer.getAddress()).toString()
          setAccount(address);
          
          
        const contractAddress = "0xeA759e027bcD22F1148bA059FF3b65D4F238E879" 

          const getContract =  new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          )
          

        
          //console.log(getContract)
          //console.log(address)
        
        
          setContract(getContract);
          setprovider(provider);
          }catch(error){
            console.error("error requesting accounts",error)
          }

        }else{
          console.error("Unable to connect Metamask")
        }
      }
      provider && loadProvider()
    },[])

       function FileUploadLoad(){
        return (
          <FileUpload account={account} provider={provider} Contract={Contract}></FileUpload>
        )
      }

    function Home(){
      return(
        <div >
          <h1 style={{color:"white",textAlign:"center",fontSize:"70px",fontStyle:"-moz-initial"}}>ChainDrive</h1>
          {account && ( // Conditional rendering to check if 'account' is available
        <p style={{ color: "white", textAlign: "center", fontSize: "20px" }}>[Account: {account ? account : "account not connected"}]</p>
      )}
      {FileUploadLoad()}
      
      </div>

    )
    }
    function Files(){
      return(

        <Display Contract={Contract} account={account}></Display>

      )
    }
    
    return (
      <div className="App">
        <BrowserRouter>
        <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to = "/home">Home </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to = "/files" >Files</Nav.Link>
        </Nav.Item>
        <Nav.Item></Nav.Item>
        </Nav>
        <Switch>
            <Route path="/home">
            <Home />
            </Route>
            <Route path="/files">
            <Files />
            </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }

  export default App;
