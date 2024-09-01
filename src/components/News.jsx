"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; 

const News = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  const getNews = async () => {
    try {
      const response = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json");
      const { articles } = await response.json();
      setNews(articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2'>
       <h4 className='font-bold text-xl px-4'>Whats happening</h4>

      {news.slice(0, articleNum).map((article) => (
        <div key={article.url}>
        <Link href={article.url} target='_blank'>

          <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200'>

            <div className='space-y-0.5'>
            <h6 className='text-sm font-bold'>{article.title}</h6>
            <p className='text-xs font-medium text-gray-500'>
                {article.source.name}
            </p>
            </div>

            <img src={article.urlToImage} width={80} height={80} className='rounded-xl' />
          </div>
        </Link>
          
        </div>
      ))}


      <button onClick={() => setArticleNum(articleNum + 1)}
        className='text-blue-300 pl-4 pb-3 hover:text-blue-400 text-sm'>
        Load more
      </button>


    </div>
  );
};

export default News;
