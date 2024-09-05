import React, { useState } from "react";
import Ghost from "@/assets/ghost.svg";
import FooterBar from "@/components/FooterBar";

const categories: string[] = [
  "education",
  "health",
  "relationship",
  "finance",
  "technology",
  "art",
  "sports",
  "travel",
];

export default function MakeCustomAIPage() {
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState("");

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      name,
      selectedCategories,
      introduction,
      content,
      comments,
    });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Make Custom AI</h1>
        <Ghost alt="Ghost Icon" width={30} height={30} />
      </header>

      <main className="flex-grow p-4 max-w-2xl mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Make your Custom AI!
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategories.includes(category)
                      ? "bg-yellow-400 text-gray-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {category}
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
              placeholder="Please briefly introduce your AI"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              RAG
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Things to learn"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="comments"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comments
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Update Comments"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Create
          </button>
        </form>
      </main>

      <FooterBar />
    </div>
  );
}
