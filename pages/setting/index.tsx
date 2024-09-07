import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import avatarImage from "@/assets/avatar.png";

// AI Profile interface
interface AIProfile {
  id: string;
  name: string;
  category: string;
  introductions: string;
  image: string;
}

// Earnings interface
interface Earnings {
  tokens: number;
  estimatedValue: number;
}

// Combined interface for AI with earnings
interface AIWithEarnings extends AIProfile, Earnings {}

// AIProfileCard Component
const AIProfileCard: React.FC<AIWithEarnings & { onDelete: () => void }> = ({
  id,
  name,
  category,
  introductions,
  image,
  tokens,
  estimatedValue,
  onDelete,
}) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/ai/${id}/edit`);
  };

  const handleCollectEarnings = () => {
    console.log(`Collecting earnings for AI: ${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex mb-2 space-x-2">
        <button
          onClick={handleEditClick}
          className="bg-gray-100 text-gray-800 px-4 py-2 w-full rounded-lg hover:bg-gray-200 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 w-full rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            src={image || avatarImage}
            alt={name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{introductions}</p>
      <div className="border-t pt-4">
        <h4 className="font-semibold text-lg mb-2">Earnings</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Tokens</p>
            <p className="text-xl font-bold">{tokens.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estimated Value</p>
            <p className="text-xl font-bold">
              ${estimatedValue.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleCollectEarnings}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
};

// Main SettingsPage Component
const SettingsPage: React.FC = () => {
  const { user } = useUserStore();
  const [myAIs, setMyAIs] = useState<AIWithEarnings[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.userid) {
      fetchMyAIProfiles();
    }
  }, [user?.userid]);

  const fetchMyAIProfiles = async () => {
    if (!user?.userid) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://52.87.64.91:8000/ai/myais/${user.userid}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch AI profiles");
      }
      const data = await response.json();

      let aisWithEarnings: AIWithEarnings[];

      if (Array.isArray(data)) {
        aisWithEarnings = data.map((ai: AIProfile) => ({
          ...ai,
          tokens: Math.floor(Math.random() * 100000), // 임시 데이터
          estimatedValue: Math.floor(Math.random() * 10000), // 임시 데이터
        }));
      } else if (data && Array.isArray(data.ais)) {
        aisWithEarnings = data.ais.map((ai: AIProfile) => ({
          ...ai,
          tokens: Math.floor(Math.random() * 100000), // 임시 데이터
          estimatedValue: Math.floor(Math.random() * 10000), // 임시 데이터
        }));
      } else {
        throw new Error("Unexpected data format from API");
      }

      setMyAIs(aisWithEarnings);
    } catch (error) {
      console.error("Error fetching AI profiles:", error);
      setError("Failed to load AI profiles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAI = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this AI?")) {
      try {
        const response = await fetch(`http://52.87.64.91:8000/ai/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setMyAIs((prevAIs) => prevAIs.filter((ai) => ai.id !== id));
          alert("AI deleted successfully");
        } else {
          throw new Error("Failed to delete AI");
        }
      } catch (error) {
        console.error("Error deleting AI:", error);
        alert("Failed to delete AI. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">My AIs and Earnings</h2>
        <p className="text-gray-600 mb-4">
          Manage your AI profiles and collect earnings.
        </p>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && (
          <div className="space-y-4">
            {myAIs.length > 0 ? (
              myAIs.map((ai) => (
                <AIProfileCard
                  key={ai.id}
                  {...ai}
                  onDelete={() => handleDeleteAI(ai.id)}
                />
              ))
            ) : (
              <p>No AI profiles found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default SettingsPage;

export async function getServerSideProps() {
  return {
    props: {
      title: "Settings",
    },
  };
}
