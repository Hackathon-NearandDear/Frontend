import React, { useState, useEffect, useRef, useCallback } from "react";
import AICard from "@/components/AICard";
import { fetchTopAIs } from "@/utils/api/ai";

interface AIModel {
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

const ITEMS_PER_LOAD = 3;

const ListPage = () => {
  const [displayedCards, setDisplayedCards] = useState<AIModel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [aiList, setAiList] = useState<AIModel[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const loadAIModels = async () => {
      try {
        const data = await fetchTopAIs();
        setAiList(data.ais);
      } catch (error) {
        console.error(error);
      }
    };
    loadAIModels();
  }, []);

  const lastCardElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreCards();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const loadMoreCards = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedCards((prevCards) => {
        const newCards = aiList.slice(
          prevCards.length,
          prevCards.length + ITEMS_PER_LOAD,
        );
        if (prevCards.length + newCards.length >= aiList.length) {
          setHasMore(false);
        }
        return [...prevCards, ...newCards];
      });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadMoreCards();
  }, []);

  return (
    <div className="flex-grow overflow-y-auto">
      <div className="py-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search your best-fit AI"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiList.map((model, index) => (
            <div
              key={model.id}
              ref={
                index === displayedCards.length - 1 ? lastCardElementRef : null
              }
            >
              <AICard
                name={model.name}
                introductions={model.introductions}
                category={model.category}
                id={model.id}
                creator={model.creator}
              />
            </div>
          ))}
        </div>
        {loading && (
          <p className="text-center mt-4">Loading more AI models...</p>
        )}
        {!hasMore && (
          <p className="text-center mt-4">No more AI models to load</p>
        )}
      </div>
    </div>
  );
};

export default ListPage;

export async function getStaticProps() {
  return {
    props: {
      title: "AI Models",
    },
  };
}
