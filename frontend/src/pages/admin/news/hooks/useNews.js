import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../../api/axios";

export default function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/admin/news");

      setNews(data.news);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    fetchNews,
  };
}