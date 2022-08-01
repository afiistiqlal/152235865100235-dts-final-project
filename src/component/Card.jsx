function Card({ title, post }) {
  return (
    <div className="border m-4 p-4 flex flex-col flex-wrap rounded-lg hover:bg-gray-100">
      <h1 className="text-lg">{title}</h1>
      <p className="text-base">{post}</p>
    </div>
  );
}

export default Card;
