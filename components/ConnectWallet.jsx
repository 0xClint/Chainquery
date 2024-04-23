"use client";
import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (!connected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setAccount(_walletAddress);
    } else {
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setAccount("");
    }
  }

  const switchChain = async (chainId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("wallet_switchEthereumChain", [{ chainId }]);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {account ? (
        <div className="flex">
          <select
            className="select select-bordered w-28 max-w-xs"
            onChange={(e) => switchChain(e.target.value)}
            defaultValue={"chain"}
          >
            <option value="0x4cb2f">Fil Calibration</option>
            <option value="0x66eee">Arbitrum Sepolia</option>
            <option value="0x1">Ethereum</option>
            <option value="0x89">Polygon</option>
          </select>
          <div className="btn btn-neutral flex items-center gap-2">
            <FaUserLarge />

            {`${account.slice(0, 4)}..${account.slice(account.length - 4)}`}
          </div>
        </div>
      ) : (
        <button className="btn btn-neutral text-white" onClick={connectWallet}>
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
