import Ghost from "@/assets/ghost.svg";
import google from "@/assets/google.png";
import metamask from "@/assets/metamask.png";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="mb-20 font-semibold text-4xl">Near and Dear</div>
        <div className="mb-32 flex justify-center">
          <Ghost width={300} height={300} />
        </div>

        <button className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center">
          <Image src={google} alt="google" className="mr-4" width={24} />
          <Link href={'/home'}>Login with Google</Link>
        </button>

        <button className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center">
          <Image src={metamask} alt="metamask" className="mr-4" width={24} />
          <Link href={'/home'}>Login with Metamask</Link>
        </button>
      </div>
    </div>
  );
}
