import { useEffect, useState } from "react";
import ChatCard from "@/components/ChatCard";
import { useUserStore } from "@/store/userStore";

interface ChatModel {
  id: string;
  title: string;
  category: string;
  imageSrc?: string;
}

const ChatListPage: React.FC = () => {
  const [chatModels, setChatModels] = useState<ChatModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user || !user.userid) {
        setError("User not logged in");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/chats/${user.userid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChatModels(data);
      } catch (err) {
        setError("Failed to load chats. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [user]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (chatModels.length === 0) {
    return <div className="text-gray-500 text-center py-6">No chats found. Start a new conversation!</div>;
  }

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