import { useEffect, useState } from "react";
import ChatCard from "@/components/ChatCard";
import { useUserStore } from "@/store/userStore";
import { fetchChatList } from "@/utils/api/user";
import { fetchAIDetails } from "@/utils/api/ai";

interface ChatModel {
  chatid: string;
  aiid: string;
  userid: string;
}

interface AIDetails {
  id: string;
  name: string;
  category: string;
  introductions: string;
}

interface ChatWithDetails extends ChatModel {
  aiDetails: AIDetails | null;
}

const ChatListPage: React.FC = () => {
  const [chats, setChats] = useState<ChatWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchChatsAndDetails = async () => {
      if (!user || !user.userid) {
        setIsLoading(false);
        return;
      }

      try {
        const chatData = await fetchChatList(user.userid);
        const chatsWithDetails: ChatWithDetails[] = await Promise.all(
          chatData.chats.map(async (chat: ChatModel) => {
            try {
              const aiDetails = await fetchAIDetails(chat.aiid);
              return { ...chat, aiDetails };
            } catch (error) {
              console.error(
                `Failed to fetch details for AI ${chat.aiid}:`,
                error,
              );
              return { ...chat, aiDetails: null };
            }
          }),
        );
        setChats(chatsWithDetails);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError("Failed to load chats. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.userid) {
      setIsLoading(true);
      fetchChatsAndDetails();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!user || !user.userid) {
    return (
      <div className="text-gray-500 text-center py-6">
        Please log in to view your chats.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (chats.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">
        No chats found. Start a new conversation!
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-y-auto">
      <div className="py-6 space-y-4">
        {chats.map((chat, index) => (
          <ChatCard
            key={`${chat.chatid}-${index}`}
            chatid={chat.chatid}
            aiid={chat.aiid}
            title={chat.aiDetails?.name || "Unknown AI"}
            category={chat.aiDetails?.category || "Unknown Category"}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatListPage;
