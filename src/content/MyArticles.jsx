import { useState, useEffect } from "react";
import { auth, db } from "../data/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import Content from "../component/Content";
import { Link, useSearchParams } from "react-router-dom";

function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, "article"), where("uid", "==", uid));
        const doc = getDocs(q);
        doc.then((result) => {
          setArticles(result.docs);
        });
      }
    });
  }, []);

  return (
    <div className="flex flex-col my-4 w-full mx-auto max-w-7xl">
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
      {articles
        .filter((article) => {
          let filter = searchParams.get("filter");
          if (!filter) return true;
          let title = article.data().title.toLowerCase();
          return title.startsWith(filter.toLowerCase());
        })
        .map((items, index) => {
          return (
            <div key={index}>
              <Link to={`/myarticles/${items.id}`}>
                <Content article={items.data()} />
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default MyArticles;
