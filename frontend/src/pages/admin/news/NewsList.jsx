import NewsCard from "./NewsCard";

export default function NewsList({
  news,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {news.map((item, index) => (
        <NewsCard
          key={item._id}
          item={item}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}