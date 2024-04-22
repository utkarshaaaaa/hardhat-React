import "./App.css";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Lock.abi,
          signer
        );  


        console.log(contract);    
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };

    
    provider && loadProvider();
  }, []);

  // useEffect(()=>{
  //   const getGreetings=async()=>{
  //     // const greeting= await contract.get()
  //     // console.log(greeting,"is the data")

  //   }
   
  //  getGreetings()

  // },[contract])





  return <div className="App">

    <>
    {account}
    </>
  </div>;
}

export default App;
