import Image from "next/image";
import avatarImage from "@/assets/avatar.png";

interface ChatCardProps {
  title: string;
  category: string;
  imageSrc?: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ title, category, imageSrc }) => {
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
      <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
        Chat
      </button>
    </div>
  );
};

export default ChatCard;
