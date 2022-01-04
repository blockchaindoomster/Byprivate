import React, { useState, useEffect } from "react";
import "./screen1.scss";
import Web3 from "web3";
import {UseWalletProvider} from 'use-wallet'
import 'react-toastify/dist/ReactToastify.css'
import {contractAbi, contractAddress, privateKey, rpcUrl} from '../config'
import transferList from '../config/bitbiketransfer.json'
import { ethers } from 'ethers'


const Screen2 = () => {
  const [tokenContract, setTokenContract] = useState({})
  
  useEffect(() => {
    const web3 = new Web3(rpcUrl);
    const Tcontract = new web3.eth.Contract(contractAbi, contractAddress)
    setTokenContract(Tcontract)
    }, [])

  const handleClickTransfer = async () => {
    const web3 = new Web3(rpcUrl);
    const sender = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    // setInterval(async () => {
    //   const walletBalance = await web3.eth.getBalance(sender.toLowerCase())
    //   console.log(walletBalance / 1e18);
    // }, 1000)
    const walletBalance = await web3.eth.getBalance(sender.toLowerCase())
    console.log(walletBalance / 1e18);


    // if((walletBalance / 1e18) > 1) {
    //   console.log("came");
    //   const price = 3*1e17;
    //   const amountIn = ethers.BigNumber.from(price.toString()).toHexString();
    //   const signedTx = await web3.eth.accounts.signTransaction(
    //       {
    //           to: "0x5687093237C7E9Eac7e7682B646B9C2006543EE2",
    //           gas: 21000,
    //           gasPrice: web3.utils.toWei('3', 'gwei'),
    //           value: amountIn
    //       },
    //       privateKey,
    //       false,
    //   );
    //   await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    //   console.log("success");
    // }



    // var tmp_nonce = await web3.eth.getTransactionCount(sender);
    // for(var i=8477; i< transferList.length; i++) {
    //   const tokenOwner = await tokenContract.methods.ownerOf(transferList[i].uint256Tokenid).call();
    //   console.log("i = ", i);
    //   if(tokenOwner.toLocaleLowerCase() !== transferList[i].addressFrom) {
    //     console.log("You are not owner of", transferList[i].uint256Tokenid, "Token");
    //     continue;
    //   } else {
    //     const query = tokenContract.methods.safeTransferFrom(transferList[i].addressFrom, transferList[i].addressTo, transferList[i].uint256Tokenid);
    //     const encodedABI = query.encodeABI();
    //     const signedTx = await web3.eth.accounts.signTransaction(
    //         {
    //             data: encodedABI,
    //             from: sender,
    //             to: contractAddress,
    //             gas: 180000,
    //             gasPrice: web3.utils.toWei('30', 'gwei'),
    //             nonce: tmp_nonce.toString()
    //         },
    //         privateKey,
    //         false,
    //     );
    //     await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    //     console.log("Success transfer",transferList[i].uint256Tokenid ," to ", transferList[i].addressTo);
    //   }
    //   tmp_nonce = tmp_nonce + 1
    // }
  }

  return (
    <div className="mainDiv">
      <div style={{padding: '30px'}}>
        <button className="tryButton" onClick={() => handleClickTransfer()}>Try Transfer</button>
      </div>
    </div>
  )
};

export default function Screen1() {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        fortmatic: { apiKey: '' },
        portis: { dAppId: '' },
        walletconnect: { rpcUrl: rpcUrl },
        walletlink: { url: 'https://mainnet.eth.aragon.network/' },
      }}
    >
        <Screen2 />
      </UseWalletProvider>
  )
}