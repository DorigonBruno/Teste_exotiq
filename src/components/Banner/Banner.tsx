import React from "react";
import Overlay from "../../util/Overlay";
import { formatDate } from "../../util/Util";

const Banner = () => {
  interface Article {
    urlToImage: string;
    title: string;
    url: string;
    publishedAt: string;
  }

  interface Noticy {
    articles: Article[];
  }

  const [noticy, setNoticy] = React.useState<Noticy | null>(null);
  const [loading, setLoading] = React.useState(true);

  const apiKey = "e56b0fe85d7440ebb43f59c50319b5b0";

  React.useEffect(() => {
    async function fetchData(url: RequestInfo | URL) {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setNoticy(json);
      } catch (erro) {
        console.error(erro);
      } finally {
        setLoading(false);
      }
    }

    fetchData(
      `https://newsapi.org/v2/everything?q=brazil&language=pt&apiKey=${apiKey}`
    );
  }, []);

  if (noticy == null) return null;
  if (loading) return <p>Carregando...</p>;

  const destaque = noticy.articles[0];
  const outrasNoticias = noticy.articles.slice(1, 5);

  return (
    <div className="hidden lg:flex justify-center gap-10 mt-10 w-screen px-4">
      <div className="relative">
        <img
          src={destaque.urlToImage}
          alt={destaque.title}
          className="w-full max-w-2xl h-96 object-cover rounded-lg"
        />
        <Overlay
          title={destaque.title}
          publishedAt={formatDate(destaque.publishedAt)}
          url={destaque.url}
        />
      </div>

      <div className="flex flex-col justify-between items-center max-w-md">
        {outrasNoticias.map((noticia, index) => (
          <div key={index} className="flex justify-between gap-3">
            <img
              src={noticia.urlToImage}
              alt={noticia.title}
              className="block object-cover w-28"
            />
            <ul className="flex flex-col gap-2 max-w-sm">
              <li>
                <p className="text-xs text-gray-500">
                  {formatDate(noticia.publishedAt)}
                </p>
              </li>
              <li>
                <h2 className="text-base font-bold">{noticia.title}</h2>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
