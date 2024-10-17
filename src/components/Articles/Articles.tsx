import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Filtros from "../../util/Filtros";
import TimeAgo from "../../util/TimeAgo";
import Spinner from "../../util/Spinner";

const Articles = () => {
  const { title, author, urlToImage, description, url, publishedAt } =
    useParams<{
      title: string;
      content: string;
      author: string;
      urlToImage: string;
      description: string;
      url: string;
      publishedAt: string;
    }>();

  const [articleContent, setArticleContent] = useState<string>("");
  const [newsType, setNewsType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    if (url) {
      const extractedType = extractNewsType(url);
      setNewsType(extractedType);

      const fetchArticle = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3000/scrape?url=${encodeURIComponent(url)}`
          );
          const data = await response.json();

          if (data.content) {
            setArticleContent(data.content);
          } else {
            console.error("Erro ao obter conteúdo:", data.error);
          }
        } catch (error) {
          console.error("Erro ao buscar artigo:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [url]);

  const extractNewsType = (url: string) => {
    const urlParts = url.split("/");
    const newsType = urlParts[3];
    return newsType.charAt(0).toUpperCase() + newsType.slice(1);
  };

  const titleShow = location.pathname === "/" ? "Geral" : `${newsType}`;

  const publishedDate = publishedAt ? new Date(publishedAt) : new Date();
  const formattedDate = publishedDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="overflow-hidden">
      <Header title={titleShow} showDynamicTitle={location.pathname !== "/"} />
      <Filtros />
      <div className="flex flex-col justify-center items-center p-4 w-full max-w-5xl mx-auto">
        {loading ? ( // Verifica se está carregando
          <Spinner /> // Mostra o Spinner durante o carregamento
        ) : (
          <>
            <div className="flex flex-col gap-3 md:gap-7 mb-8">
              <h1 className="mt-7 text-xl mb-3 font-bold max-w-xs self-start md:text-4xl md:max-w-full md:mt-16">
                {title}
              </h1>
              <p className="text-gray-400 text-sm md:text-lg">{description}</p>
              <div>
                <p className="text-sm md:text-base">
                  Por <strong>{author}</strong>
                </p>
                <p className="text-gray-400 text-sm md:text-base">
                  Publicado em {formattedDate} (<TimeAgo date={publishedDate} />
                  )
                </p>
              </div>
            </div>
            <img
              className="w-full md:max-w-5xl object-cover mb-10"
              src={urlToImage}
              alt={title}
            />
            <div
              className="w-full max-w-7xl mb-40 p-6"
              dangerouslySetInnerHTML={{
                __html: articleContent.replace(
                  /<p>/g,
                  '<p class="mb-8 text-sm leading-relaxed md:text-lg">'
                ),
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Articles;
