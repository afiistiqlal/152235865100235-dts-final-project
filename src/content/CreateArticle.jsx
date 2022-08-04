import { useState, useEffect } from "react";
import { auth, saveArticle } from "../data/firebase.js";
import { useNavigate } from "react-router-dom";
import Tags from "../component/Tags";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [saved, setSaved] = useState(false);
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const save = () => {
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const save = saveArticle(uid, title, post, author, tags);
        save.then(setSaved(true));
      }
  };

  useEffect(() => {
    if (saved) {
      navigate("/myarticles");
      setTitle("");
      setPost("");
    }
  }, [navigate, saved]);

  return (
    <div className="flex flex-col mx-10 border rounded text-base px-6">
      <div className="pt-4">
        <label htmlFor="" className="block text-lg ">
          Title
        </label>
        <input
          type="text"
          className="border w-full rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="">
        <label htmlFor="" className="block text-lg">
          Article
        </label>
        <textarea
          type="text"
          className="border w-full rounded p-2"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>

      <div className="">
        <input
          type="text"
          className="border w-full rounded p-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="author"
        />
      </div>

      <Tags arrTags={setTags} />

      <div className="pb-6">
        <button
          className="border px-4 py-2 my-2 rounded "
          onClick={() => save()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateArticle;
