"use client"
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const Home = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      setWalletConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions: {} // required
      });
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      setProvider(provider);
      setWalletConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Smart Mint</h1>
        <p className="text-lg text-gray-300 mb-8">A one stop for all your ERC20 Token Needs</p>
        <div onClick={!walletConnected ? connectWallet : undefined}>
          <div className={`px-6 py-3 ${walletConnected ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-lg ${walletConnected ? '' : 'hover:bg-blue-600'} transition duration-300 cursor-pointer`} style={{ cursor: walletConnected ? 'not-allowed' : 'pointer' }}>
            {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </div>
        </div>
        {walletConnected && (
          <div className="mt-10 mb-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 mr-2">
              ERC20 Token Generator
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
              ERC-20 Swap
            </button>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-10 rounded-lg shadow-lg text-center">
            <p className="mb-4">Please install a wallet to connect.</p>
            <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;