import Image from "next/image";
import avatarImage from "@/assets/avatar.png";

interface AICardProps {
  title: string;
  description: string;
  imageSrc?: string;
  category: string;
}

const AICard: React.FC<AICardProps> = ({
  title,
  description,
  imageSrc,
  category,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex mb-4 flex-grow">
        <div className="flex-shrink-0 mr-4">
          <Image
            src={imageSrc || avatarImage}
            alt={title}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h2 className="text-2xl font-bold mb-1 truncate">{title}</h2>
          <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded mb-2">
            {category}
          </span>
          <p className="text-gray-600 line-clamp-3">{description}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-auto">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Docs
        </button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Chat!
        </button>
      </div>
    </div>
  );
};

export default AICard;
