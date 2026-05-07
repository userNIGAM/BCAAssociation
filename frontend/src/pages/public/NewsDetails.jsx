/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Eye, ArrowLeft, Share2, Bookmark } from "lucide-react";
import DOMPurify from "dompurify";
import api from "../../api/axios";

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.content.substring(0, 100),
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded-lg w-1/4 mb-8" />
          <div className="h-96 bg-gray-200 rounded-xl mb-6" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
            <div className="h-4 bg-gray-200 rounded-lg w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          News Not Found
        </h1>
        <Link to="/news" className="text-blue-600 hover:underline">
          ← Back to News
        </Link>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(news.content, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "blockquote",
      "code",
      "pre",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-6 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition"
          />{" "}
          Back to News
        </Link>

        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {news.image && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="
                  w-full
                  max-h-[80vh]
                  object-contain
                  rounded-2xl
                  bg-gray-100
  "
              />
            </div>
          )}

          <div className="p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />{" "}
                  {new Date(news.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={16} /> {news.views || 0} views
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition"
                >
                  <Share2 size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {news.title}
            </h1>

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-blue-600 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
