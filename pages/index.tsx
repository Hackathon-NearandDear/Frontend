"use client";

import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";
import Ghost from "@/assets/ghost.svg";
import google from "@/assets/google.png";
import metamask from "@/assets/metamask.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import Web3 from "web3";
import { loginUser } from "@/utils/api/user";

const clientId =
  "BF4DNPEx5g1IiuYGZyCeKDoqzpZuG_Lp_y_yNRk6LH0r1EJFawNJWipltHHxC5Jddn9vMnf2012JBDxMvVgihLo";

export default function Login() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth",
          },
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider: new EthereumPrivateKeyProvider({
            config: {
              chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x1",
                rpcTarget: "https://rpc.ankr.com/eth",
              },
            },
          }),
        });

        await web3auth.initModal();
        setWeb3auth(web3auth);
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      }
    };

    init();
  }, []);

  const login = async (loginType: "google" | "metamask") => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      let localProvider;
      if (loginType === "google") {
        localProvider = await web3auth.connect();
      } else if (loginType === "metamask") {
        if (typeof window.ethereum !== "undefined") {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          localProvider = window.ethereum;
        } else {
          throw new Error("MetaMask is not installed");
        }
      } else {
        throw new Error("Invalid login type");
      }

      setProvider(localProvider);

      // Get user's Ethereum address
      const web3 = new Web3(localProvider as any);
      const address = (await web3.eth.getAccounts())[0];

      // Call login API using the imported function
      const userData = await loginUser(address);

      // Set user in Zustand store
      setUser({ address, ...userData });

      router.push("/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="mb-20 font-semibold text-4xl">Near and Dear</div>
        <div className="mb-32 flex justify-center">
          <Ghost width={300} height={300} />
        </div>

        <button
          onClick={() => login("google")}
          className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Image src={google} alt="google" className="mr-4" width={24} />
          Login with Google
        </button>

        <button
          onClick={() => login("metamask")}
          className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Image src={metamask} alt="metamask" className="mr-4" width={24} />
          Login with Metamask
        </button>
      </div>
    </div>
  );
}
