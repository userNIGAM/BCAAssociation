import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get(`/news/${id}`);
        setNews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!news) return <div className="text-center py-20">News not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <Link to="/news" className="text-blue-600">← Back to News</Link>
      <h1 className="text-3xl font-bold text-blue-800 mt-4">{news.title}</h1>
      <p className="text-gray-500 mt-2">{new Date(news.createdAt).toLocaleDateString()}</p>
      {news.image && <img src={news.image} alt={news.title} className="w-full h-64 object-cover rounded-xl my-6" />}
      <div className="mt-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
    </div>
  );
}