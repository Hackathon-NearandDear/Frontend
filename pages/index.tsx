"use client";

import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";

import Ghost from "@/assets/ghost.svg";
import google from "@/assets/google.png";
import metamask from "@/assets/metamask.png";
import Image from "next/image";
import Link from "next/link";

const clientId =
  "BKN-d92vzdSXsJatFKWlEOMwmbGSf5hoG-qYdjvHb7J_YT8gn0y5IzFOIszXGlaKMpppWa5VsVle59kmvhzfBD4";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="mb-20 font-semibold text-4xl">Near and Dear</div>
        <div className="mb-32 flex justify-center">
          <Ghost width={300} height={300} />
        </div>

        <button className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center">
          <Image src={google} alt="google" className="mr-4" width={24} />
          <Link href={"/home"}>Login with Google</Link>
        </button>

        <button className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center">
          <Image src={metamask} alt="metamask" className="mr-4" width={24} />
          <Link href={"/home"}>Login with Metamask</Link>
        </button>
      </div>
    </div>
  );
}
