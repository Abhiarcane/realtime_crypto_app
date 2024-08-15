import { useState, useEffect } from "react";
import { getNews } from "./getNews";
import { Link } from "react-router-dom";

export default function News() {
  const [news, setNews] = useState([]);

  async function getNewsdata() {
    const data = await getNews();
    console.log(data);
    if (data) setNews(data);
  }

  useEffect(() => {
    getNewsdata();
  }, []);

  return (
    <div className="mt-24 px-4 mb-10">
      <div className="flex justify-center text-3xl font-semibold text-amber-500 mb-8">
        Latest Cryptocurrency News
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {news.map((newsItem, index) => (
          <div
            key={index}
            className="bg-gray-700 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 sm:p-6 rounded-lg"
          >
            <Link to={newsItem.url}>
              <img
                src={newsItem.thumb_2x}
                alt=""
                className="w-full h-44 rounded-lg mb-4 object-cover"
              />
              <div className="text-justify text-white">
                {newsItem.description.slice(0, 200) + "..."}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
