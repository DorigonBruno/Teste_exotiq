import BookOpen from "../../assets/book-open.svg";

const Filtros = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 px-2 md:gap-4 w-screen mx-auto">
      <div className="flex items-center gap-7">
        <img src={BookOpen} alt="icone book open" />
        <p>Selecione um Filtro: </p>
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-6">
        <li>
          <a href="" className="text-red-600">
            Negócios
          </a>
        </li>
        |
        <li>
          <a href="" className="text-yellow-600">
            Entretenimento
          </a>
        </li>
        |
        <li>
          <a href="" className="text-purple-600">
            Saúde
          </a>
        </li>
        |
        <li>
          <a href="" className="text-sky-600">
            Geral
          </a>
        </li>
        |
        <li>
          <a href="" className="text-indigo-600">
            Ciência
          </a>
        </li>
        |
        <li>
          <a href="" className="text-green-600">
            Esportes
          </a>
        </li>
        |
        <li>
          <a href="" className="text-pink-600">
            Tecnologia
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Filtros;
