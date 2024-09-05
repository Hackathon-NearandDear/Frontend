import React, { useState } from "react";
import AICard from "@/components/AICard";
import Ghost from "@/assets/ghost.svg";

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
          <button className="w-full max-w-md bg-gray-800 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-600 transition">
            Make your Custom AI!
          </button>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="flex justify-around p-4 max-w-md mx-auto">
          <button className="text-gray-600 hover:text-blue-500 transition">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-blue-500 transition">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-blue-500 transition">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-blue-500 transition">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
