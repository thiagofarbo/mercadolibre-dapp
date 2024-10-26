import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import abi from './abis/MercadoLivre.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [mercadoLivre, setMercadoLivre] = useState(null)

  const [account, setAccount] = useState(null)
  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const loadBlockchainData = async () => {
    console.log("loading")

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider);

    const network = await provider.getNetwork()
    console.log("Network:", network);


    const mercadoLivre =  new ethers.Contract(config[network.chainId].mercadoLivre.address, abi.abi, provider)
    console.log("mercadoLivre", mercadoLivre);
    setMercadoLivre(mercadoLivre)

    // const items = []
    const items = []

    for( var i = 0; i<9; i++){
        const item = await mercadoLivre.items(i+1);
        items.push(item);
    } 
    console.log("ITEMS:", items);
    const eletronics = items.filter((item) => item.category === 'electronics');
    const clothing = items.filter((item) => item.category === 'clothing');
    const toys = items.filter((item) => item.category === 'toys');

    console.log("eletronics:", eletronics);
    console.log("clothing:", clothing);
    console.log("toys:", toys);

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={account}/>
      <h2>Welcome to MercadoLivre Best Sellers</h2>

    </div>  
  );
}

export default App;
