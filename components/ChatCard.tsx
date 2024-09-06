import Image from "next/image";
import { useRouter } from "next/router";
import avatarImage from "@/assets/avatar.png";
import { useUserStore } from "@/store/userStore";

interface ChatCardProps {
  chatid?: string;
  aiid: string;
  title: string;
  category: string;
  imageSrc?: string;
}

const ChatCard: React.FC<ChatCardProps> = ({
  chatid,
  aiid,
  title,
  category,
  imageSrc,
}) => {
  const router = useRouter();
  const { user } = useUserStore();

  const handleChatClick = async () => {
    if (!user) {
      console.error("User is not logged in");
      // You might want to redirect to login page or show a message
      return;
    }

    try {
      // If chatid exists, navigate to the existing chat
      router.push(`/ai/${aiid}/chat`);
    } catch (error) {
      console.error("Error handling chat click:", error);
      // You might want to show an error message to the user
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={imageSrc || avatarImage}
          alt={title}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      <button
        onClick={handleChatClick}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        Chat
      </button>
    </div>
  );
};

export default ChatCard;
