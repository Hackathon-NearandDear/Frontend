import Image from "next/image";
import Link from "next/link";
import avatarImage from "@/assets/avatar.png";

interface AICardProps {
  id: string;
  name: string;
  creator: string;
  category: string;
  introductions: string;
  imageSrc?: string;
}

const AICard: React.FC<AICardProps> = ({
  id,
  name,
  creator,
  category,
  introductions,
  imageSrc,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="flex mb-4 flex-grow">
        <div className="flex-shrink-0 mr-4">
          <Image
            src={imageSrc || avatarImage}
            alt={name}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h2 className="text-2xl font-bold mb-1 truncate">{name}</h2>
          <div className="flex justify-between">
            <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded mb-2">
              {category}
            </span>
            <span className="inline-block bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded mb-2">
              {creator}
            </span>
          </div>
          <p className="text-gray-600 line-clamp-3">{introductions}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-auto">
        <Link href={`/ai/${id}/docs`} passHref>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Docs
          </button>
        </Link>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Chat!
        </button>
      </div>
    </div>
  );
};

export default AICard;
