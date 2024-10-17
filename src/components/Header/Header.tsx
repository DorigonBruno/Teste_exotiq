import { useNavigate } from "react-router-dom"; // Importa o hook para navegação
import PesquisaSvg from "../../util/PesquisaSvg";
import BackButtonSvg from "../../util/BackButtonSvg"; // Importa o SVG do botão de voltar
import React from "react";

interface HeaderProps {
  title: string;
  showDynamicTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showDynamicTitle }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-purple-900 w-screen text-white p-4 mb-4">
      <div className="flex justify-center py-4 items-center gap-16 md:gap-60">
        {showDynamicTitle && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <BackButtonSvg />
            <h1 className="font-bold text-2xl hidden md:block">Yntech News</h1>
          </div>
        )}

        {!showDynamicTitle && (
          <h1 className="font-bold text-2xl hidden md:flex text-center">
            Yntech News
          </h1>
        )}

        {showDynamicTitle ? (
          <div className="flex items-center gap-10">
            <h1 className="font-bold text-xl">{title}</h1>
          </div>
        ) : (
          <div className="flex md:hidden justify-evenly items-center w-screen gap-10">
            <h1 className="font-bold text-xl md:hidden sm:flex">{title}</h1>
            <PesquisaSvg color="#fff" />
          </div>
        )}

        <div className="bg-purple-950 w-60 rounded-lg p-2 hidden md:flex justify-end">
          <PesquisaSvg color="#581c87" />
        </div>
        <div className="sm:flex md:hidden"></div>
      </div>
    </header>
  );
};

export default Header;
