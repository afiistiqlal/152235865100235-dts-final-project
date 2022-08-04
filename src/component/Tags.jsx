import { useState, useEffect } from "react";

function Tags({ arrTags }) {
  const [input, setInput] = useState("");
  const [tag, setTag] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!tag.includes(input) && input !== "") {
      setTag([...tag, input]);
    }
    setInput("");
  };

  const deleteTag = (item) => {
    setTag(tag.filter((e) => e !== item));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      if (event.target.value === "") {
        setTag(tag.slice(0, -1));
      }
    }
  };

  useEffect(() => {
    arrTags(tag);
  }, [arrTags, tag]);

  return (
    <div className="my-2">
      <div className="border rounded p-2">
        <div className="flex flex-wrap">
          {tag.map((item, index) => {
            return (
              <div className="bg-slate-100 rounded-md p-1 mr-1" key={index}>
                {item}{" "}
                <button
                  className="hover:text-red-600"
                  onClick={() => deleteTag(item)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <div className="">
          <form onSubmit={onSubmit} className="">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input Tag Here"
              onKeyDown={handleKeyDown}
              className="focus:outline-none"
            />
          </form>
        </div>
      </div>
      <em className="italic text-gray-400 text-sm">#press enter to set tags</em>
    </div>
  );
}

export default Tags;
