import Feed from "rss-to-json";
const { parse } = require("rss-to-json");

let rss = async () => {
  await parse("https://medium.com/feed/tag/react-indonesia");
};

const getFeed = () => {
  let uri =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/react-indonesia";
  return fetch(uri)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      return data.items;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { rss, getFeed, Feed };
