import React from "react";

interface OverlayProps {
  title: string;
  publishedAt: string;
  url: string;
}

const Overlay: React.FC<OverlayProps> = ({ title, publishedAt, url }) => {
  return (
    <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-xs text-gray-100 mt-2">{publishedAt}</p>
      <div className="flex justify-between items-center mt-4">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 text-sm"
        ></a>
      </div>
    </div>
  );
};

export default Overlay;
