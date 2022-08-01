import { useState, useEffect } from "react";
import { auth, saveArticle } from "../data/firebase.js";
import { useNavigate } from "react-router-dom";
import Tags from "../component/Tags";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [thanks, setThanks] = useState(0);
  const [saved, setSaved] = useState(false);
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const save = () => {
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const save = saveArticle(uid, title, post, author, tags, thanks);
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
    <div className="flex flex-col mx-auto border max-w-xl text-base px-4">
      <div className="">
        <label htmlFor="" className="block">
          Title
        </label>
        <input
          type="text"
          className="border w-full "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="">
        <label htmlFor="" className="block">
          Article
        </label>
        <textarea
          type="text"
          className="border w-full "
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>

      <div className="">
        <input
          type="text"
          className="border w-full "
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="author"
        />
      </div>

      <Tags arrTags={setTags} />

      <div className="">
        <button onClick={() => setThanks(thanks + 1)}>Thanks! {thanks}</button>
      </div>

      <div className="">
        <button
          className="border px-4 py-2 my-2 rounded"
          onClick={() => save()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateArticle;
