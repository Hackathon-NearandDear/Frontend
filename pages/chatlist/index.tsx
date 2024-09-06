import React from "react";
import ChatCard from "@/components/ChatCard";

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
    <div className="flex-grow overflow-y-auto">
      <div className="py-6 space-y-4">
        {chatModels.map((model) => (
          <ChatCard
            key={model.id}
            title={model.title}
            category={model.category}
            imageSrc={model.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatListPage;

export async function getStaticProps() {
  return {
    props: {
      title: "My Chats",
    },
  };
}
