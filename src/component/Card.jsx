function Card({ title, post }) {
  return (
    <div className="border m-4 p-4 flex flex-col flex-wrap rounded-lg hover:bg-gray-100">
      <h1 className="text-lg font-bold  text-transform: capitalize py-4">{title}</h1>
      <p dangerouslySetInnerHTML={{__html:post}}/>
    </div>
  );
}

export default Card;
