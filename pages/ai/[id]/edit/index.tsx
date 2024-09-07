import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";

const categories: string[] = [
  "Education",
  "Health & Fitness",
  "Entertainment",
  "Social networking",
  "Business",
  "Developer tools",
  "Graphics & Design",
];

interface AIData {
  id: string;
  name: string;
  category: string;
  introductions: string;
  contents: string;
  logs: string;
}

export default function EditAIPage() {
  const router = useRouter();
  const { id } = router.query;
  const [aiData, setAIData] = useState<AIData | null>(null);
  const [category, setCategory] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [contents, setContents] = useState("");
  const [logs, setLogs] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchAIData();
    }
  }, [id]);

  const fetchAIData = async () => {
    try {
      const response = await fetch(`http://52.87.64.91:8000/ai/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch AI data");
      }
      const data = await response.json();
      setAIData(data);
      setCategory(data.category);
      setIntroduction(data.introductions);
      setContents(data.contents || "");
      setLogs(data.logs || "");
    } catch (error) {
      console.error("Error fetching AI data:", error);
      setError("Failed to load AI data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !id) return;

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://52.87.64.91:8000/ai/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          introductions: introduction,
          contents,
          logs,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update AI");
      }

      router.push("/setting");
    } catch (error) {
      console.error("Error updating AI:", error);
      setError("Failed to update AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex-grow p-2 max-w-2xl mx-auto w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h1 className="text-2xl font-bold mb-6">Edit AI: {aiData?.name}</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm ${
                  category === cat
                    ? "bg-yellow-400 text-gray-800"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="introduction"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Introduction
          </label>
          <textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contents"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            RAG Contents
          </label>
          <textarea
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={5}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="logs"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comments
          </label>
          <textarea
            id="logs"
            value={logs}
            onChange={(e) => setLogs(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update AI"}
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "Edit AI",
    },
  };
}
