import { useState } from "react";

const categories: string[] = [
  "Education",
  "Health & Fitness",
  "Entertainment",
  "Social networking",
  "Business",
  "Developer tools",
  "Graphics & Design",
];

export default function MakeCustomAIPage() {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      name,
      selectedCategory,
      introduction,
      content,
      comments,
    });
  };

  return (
    <div className="flex-grow p-2 max-w-2xl mx-auto w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >

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
                onClick={() => handleCategorySelect(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category
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
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Make Custom AI",
    },
  };
}
