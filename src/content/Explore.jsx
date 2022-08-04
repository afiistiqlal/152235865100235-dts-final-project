import { getFeed } from "../data/rsstojson";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../component/Card";

function Explore() {
  const [news, setNews] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const feed = getFeed();

  useEffect(() => {
    feed.then((result) => {
      setNews(result)
    });
  });

  return (
    <div className="flex flex-col my-4 mx-auto w-full max-w-7xl">
      <input
        type="text"
        placeholder="Search Title"
        className="w-min mx-auto px-2 py-2 border rounded-md focus:ring-gray-100"
        value={searchParams.get("filter") || ""}
        onChange={(e) => {
          let filter = e.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
      />

      {news
        .filter((news) => {
          let filter = searchParams.get("filter");
          if (!filter) return true;
          let title = news.title.toLowerCase();
          return title.startsWith(filter.toLowerCase());
        })
        .map((item, index) => {
          const post = item.content;
          return (
            <div className="" key={index}>
              <a target="_blank" rel="noreferrer" href={item.url}>
                <Card
                  title={item.title}
                  post={post}
                />
              </a>
            </div>
          );
        })}
      <div className="flex flex-col">
        <div className="animate-bounce flex space-x-4 p-2 mx-auto">.....</div>
      </div>
    </div>
  );
}

export default Explore;
