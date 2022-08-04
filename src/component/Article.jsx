import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../data/firebase";

function Article() {
  const params = useParams();
  const articleId = params.articleId;
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    getArticleById(articleId).then((result) => {
      setTitle(result.title);
      setPost(result.post);
      setTags(result.tags);
      setAuthor(result.author);
      const t = new Date(result.timestamp.seconds * 1000);
      setTime(t.toLocaleDateString());
    });
  });

  return (
    <div className="mx-auto border p-6 rounded-lg">
      <div className="p-6">
        <div className="text-6xl font-semibold text-transform: capitalize p-2">
          {title}
        </div>
        <div className="text-base p-2 text-justify">{post}</div>
        <div className="flex flex-row justify-end">
          <div className="text-base flex flex-row p-2">
            {tags.map((item, index) => {
              return (
                <div key={index} className="rounded bg-neutral-200 italic ml-1 px-2 text-sm text-right">
                  #{item}{" "}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-2 text-sm text-transform: capitalize text-right">
          {author}
        </div>
        <div className="p-2 text-xs text-right">{time}</div>
      </div>
    </div>
  );
}

export default Article;
