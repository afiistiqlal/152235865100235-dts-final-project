import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../data/firebase";

function Article() {
  const params = useParams();
  const articleId = params.articleId;
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  useEffect(() => {
    getArticleById(articleId).then((result) => {
      setTitle(result.title);
      setPost(result.post);
    });
  });

  return (
    <div>
      <div className="">{title}</div>
      <div className="">{post}</div>
    </div>
  );
}

export default Article;
