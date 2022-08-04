import axios from "axios";

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const baseURL = "https://newsapi.org/v2/top-headlines?country=id";
const technology = "&category=technology";
const entertainment = "&category=entertainment";

const News = axios.get(`${baseURL}&apiKey=${NEWS_API_KEY}`);

export { News, technology, entertainment };
