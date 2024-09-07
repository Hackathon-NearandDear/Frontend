import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import avatarImage from "@/assets/avatar.png";

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

interface ChatResponse {
  chatcontentsid: string;
  chatid: string;
  createdat: string;
  senderid: string;
  message: string;
}

const API_BASE_URL = "http://52.87.64.91:8000";

const AIChat = () => {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiName = useMemo(() => {
    if (typeof id === "string") {
      const parts = id.split("_");
      return parts.length > 2 ? parts[parts.length - 1] : parts[1];
    }
    return "AI Assistant";
  }, [id]);

  const chatid = useMemo(() => {
    if (typeof id === "string") {
      return id;
    }
    return null;
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatid) {
      fetchChatHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatid]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = async () => {
    if (!chatid) return;

    try {
      const response = await fetch(`${API_BASE_URL}/chatcontents/${chatid}`);
      if (!response.ok) {
        if (response.status === 404) {
          // Chat history not found, send welcome message
          const welcomeMessage: Message = {
            role: "ai",
            content: "Hello! How can I assist you?",
            timestamp: new Date().toISOString(),
          };
          setMessages([welcomeMessage]);
          await sendMessage(welcomeMessage.content, aiName);
        } else {
          throw new Error("Failed to fetch chat history");
        }
      } else {
        const data = await response.json();
        const formattedMessages: Message[] = data.chats.map(
          (chat: ChatResponse) => ({
            role: chat.senderid === user?.userid ? "user" : "ai",
            content: chat.message,
            timestamp: chat.createdat,
          }),
        );
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = async (
    content: string,
    sender: string,
  ): Promise<ChatResponse> => {
    if (!chatid) {
      throw new Error("Chat ID is not available");
    }
    const response = await fetch(`${API_BASE_URL}/chatcontent/${chatid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderid: sender,
        message: content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !user || !chatid) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage(input, user.userid);
      const aiMessage: Message = {
        role: "ai",
        content: response.message,
        timestamp: response.createdat,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full -mx-4">
      <div className="flex-grow overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end space-x-2 ${
              message.role === "user"
                ? "flex-row-reverse space-x-reverse"
                : "flex-row"
            }`}
          >
            {message.role === "ai" && (
              <div className="flex flex-col items-center space-y-1 mr-2">
                <Image
                  src={avatarImage}
                  alt="AI Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xs text-gray-500">{aiName}</span>
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-end space-x-2">
            <div className="flex flex-col items-center space-y-1">
              <Image
                src={avatarImage}
                alt="AI Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xs text-gray-500">{aiName}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex space-x-2">
                <div className="size-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="size-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="size-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t bg-white p-4 w-screen">
        <div className="flex space-x-2 max-w-[800px] mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

export async function getServerSideProps() {
  return {
    props: {
      title: "AI Chat",
    },
  };
}
