import { useState } from "react";
import "./WalletConnect.scss";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("MetaMask not detected. Please install it to use this feature.");
    }
  };

  const truncateAddress = (address) =>
    `${address.substring(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="wallet-container">
      {walletAddress ? (
        <p className="wallet-address">
          Connected: <span>{truncateAddress(walletAddress)}</span>
        </p>
      ) : (
        <button className="wallet-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
