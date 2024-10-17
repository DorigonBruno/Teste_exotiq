import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/Util"; // Assuming `formatDate` is implemented elsewhere
import Spinner from "../../util/Spinner";

interface Article {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const API_KEY = "950d895b27fa4229806c25d751bb634a";
const API_URL = `https://newsapi.org/v2/everything?sources=info-money&apiKey=${API_KEY}`;

const PostList: React.FC = () => {
  const [post, setPost] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        const json: { articles: Article[] } = await response.json(); // Type assertion for response.json()

        if (response.ok) {
          setPost(json.articles);
        } else {
          throw new Error(`API request failed with status: ${response.status}`);
        }
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col justify-center mt-16 md:mt-28 w-full max-w-6xl mx-auto mb-36 p-2">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <span className="hidden lg:block text-start mb-9 font-bold text-xl">
            Mais lidas da semana
          </span>
          {post?.slice(0, 4).map((article: Article, index: number) => (
            <Link
              key={index}
              className="flex flex-col-reverse lg:flex-row-reverse justify-between border-b-2 border-gray-300 mb-10 p-7"
              to={`/article/${encodeURIComponent(
                article.title
              )}/${encodeURIComponent(
                article.description
              )}/${encodeURIComponent(article.content)}/${encodeURIComponent(
                article.author
              )}/${encodeURIComponent(article.urlToImage)}/${encodeURIComponent(
                article.url
              )}`}
            >
              <img
                className="w-full lg:max-w-md object-cover"
                src={article.urlToImage}
                alt={article.title}
              />
              <div className="flex flex-col-reverse md:flex-col md:px-4">
                <h2 className="block text-lg mb-6 md:mb-2 font-bold lg:max-w-md md:text-2xl">
                  {article.title}
                </h2>
                <div className="flex justify-between md:mt-6 mb-4">
                  <p>{formatDate(article.publishedAt)}</p>
                  <span>tempo de Leitura</span>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
