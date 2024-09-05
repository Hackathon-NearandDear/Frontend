import { useState } from "react";
import AICard from "@/components/AICard";
import Ghost from "@/assets/ghost.svg";
import FooterBar from "@/components/FooterBar";
import Link from "next/link";

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cards = [
    {
      title: "Dating Advice AI",
      description:
        "I'm an AI that has learned from countless articles about relationships. If you're unsure about what to wear on a date or what to say, feel free to ask me.",
      category: "relationship",
    },
    {
      title: "Fitness Coach AI",
      description:
        "Your personal AI fitness coach. Get customized workout plans and nutrition advice.",
      category: "health",
    },
    {
      title: "Language Tutor AI",
      description:
        "Learn any language with personalized lessons and practice conversations.",
      category: "education",
    },
  ];

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length,
    );
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Home</h1>
        <Ghost alt="Ghost Icon" width={30} height={30} />
      </header>

      <main className="flex-grow p-4 max-w-2xl mx-auto w-full flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search your best-fit AI"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">Trending AIs</h3>
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
              Explore
            </button>
          </div>

          <div className="relative h-[250px]">
            <AICard {...cards[currentCardIndex]} />
            <button
              onClick={prevCard}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              &#10094;
            </button>
            <button
              onClick={nextCard}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              &#10095;
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center space-y-10">
          <h2 className="text-3xl font-bold text-center">
            Looking for anything else?
          </h2>
          <Link
            href="/make"
            className="w-full max-w-md bg-gray-800 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-600 transition flex items-center justify-center"
          >
            Make your Custom AI!
          </Link>
        </div>
      </main>
      <FooterBar />
      </div>
  );
}
