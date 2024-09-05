import React, { useState, useEffect } from "react";
import AICard from "@/components/AICard";
import Ghost from "@/assets/ghost.svg";
import FooterBar from "@/components/FooterBar";
import Link from "next/link";

interface AICardData {
  id: string;
  name: string;
  creator: string;
  category: string;
  introductions: string;
  usage: number;
  total_usage: number;
  ratio: number;
  collect: number;
}

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [aiCards, setAiCards] = useState<AICardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAiCards = async () => {
    try {
      const response = await fetch("http://52.87.64.91:8000/ai/top10/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAiCards(data.ais);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAiCards();
  }, []);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % aiCards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + aiCards.length) % aiCards.length,
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
            <Link href='/list' className="bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
              Explore
            </Link>
          </div>

          <div className="relative h-[250px]">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : aiCards.length > 0 ? (
              <>
                <AICard
                  id={aiCards[currentCardIndex].id}
                  name={aiCards[currentCardIndex].name}
                  creator={aiCards[currentCardIndex].creator}
                  category={aiCards[currentCardIndex].category}
                  introductions={aiCards[currentCardIndex].introductions}
                />
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
              </>
            ) : (
              <p>No AI cards available</p>
            )}
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
