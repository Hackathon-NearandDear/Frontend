import { UserState, useUserStore } from "@/store/userStore";
import { createAI } from "@/utils/api/ai";
import { useRouter } from "next/router";
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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const user = useUserStore((state: UserState) => state.user);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!user) {
      setError("User not logged in");
      setIsLoading(false);
      return;
    }

    const payload = {
      name,
      creator: user.address,
      category: selectedCategory,
      introductions: introduction,
      contents: content,
      logs: comments,
    };

    try {
      const data = await createAI(payload);
      console.log("AI created successfully:", data);
      router.push("/home");
    } catch (err) {
      console.error("Error creating AI:", err);
      if (err instanceof Error && err.message.includes("400 Bad Request")) {
        setError("이미 동일한 이름의 AI가 있습니다");
      } else {
        setError("AI 생성 중 오류가 발생했습니다");
      }
    } finally {
      setIsLoading(false);
    }
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

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
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
