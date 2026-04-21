/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import SectionHeader from '../../components/SectionHeader';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get('/news');
        setNews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="text-center py-20">Loading news...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-20 pb-10">
      <SectionHeader title="News & Announcements" />
      <div className="space-y-6">
        {news.map(item => (
          <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-blue-800">{item.title}</h2>
            <p className="text-gray-500 text-sm mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
            <p className="mt-3 text-gray-700">{item.content.substring(0, 200)}...</p>
            <Link to={`/news/${item._id}`} className="inline-block mt-3 text-blue-600 hover:underline">Read full story →</Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}