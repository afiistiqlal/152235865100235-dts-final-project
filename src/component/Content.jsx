import Card from "./Card";

function Content({ article }) {
  return (
    <div>
      <Card
        title={article.title}
        post={article.post}
      />
    </div>
  );
}

export default Content;
