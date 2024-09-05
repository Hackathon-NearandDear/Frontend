import React from "react";
import ChatCard from "@/components/ChatCard";
import FooterBar from "@/components/FooterBar";

interface ChatModel {
  id: string;
  title: string;
  category: string;
  imageSrc?: string;
}

const chatModels: ChatModel[] = [
  {
    id: "1",
    title: "Dating Advice AI",
    category: "relationship",
  },
  {
    id: "2",
    title: "Fitness Coach AI",
    category: "health",
  },
];

const ChatListPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <div className="flex-grow flex flex-col">
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-900">My Chats</h1>
        </header>

        <main className="flex-grow overflow-y-auto">
          <div className="p-4 space-y-4">
            {chatModels.map((model) => (
              <ChatCard
                key={model.id}
                title={model.title}
                category={model.category}
                imageSrc={model.imageSrc}
              />
            ))}
          </div>
        </main>
      </div>

      <FooterBar />
    </div>
  );
};

export default ChatListPage;
