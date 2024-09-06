import React from "react";
import Link from "next/link";

interface HeaderBarProps {
  title: string;
}

const Header: React.FC<HeaderBarProps> = ({
  title,
}) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      {/* 여기에 추가적인 헤더 내용을 넣을 수 있습니다. 예: 검색 바, 프로필 아이콘 등 */}
    </header>
  );
};

export default Header;
