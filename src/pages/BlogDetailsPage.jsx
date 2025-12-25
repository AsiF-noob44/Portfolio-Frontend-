import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Tag,
  Clock,
  MessageCircle,
  Maximize2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import useBlogStore from "../lib/store/useBlogStore";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleBlog, loading } = useBlogStore();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setError(null);
        const response = await fetchSingleBlog(id);
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setError(error.response?.data?.message || "Failed to load blog");

        if (error.response?.status === 404) {
          toast.error("Blog not found");
        } else if (error.response?.status === 400) {
          toast.error("Invalid blog ID");
        } else {
          toast.error("Failed to load blog details");
        }
      }
    };

    loadBlog();
  }, [id, fetchSingleBlog]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatReadTime = (description) => {
    const wordsPerMinute = 200;
    const wordCount = description?.split(/\s+/).length || 0;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-semibold">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold mb-2">Oops!</h2>
          <p className="text-base-content/70 mb-6">{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/blogs")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          className="btn btn-ghost mb-6 gap-2"
          onClick={() => navigate("/blogs")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </button>

        {/* Blog Content Card */}
        <article className="card bg-base-100 shadow-xl">
          {/* Blog Header Image */}
          {blog.img && (
            <figure
              className="relative h-96 overflow-hidden cursor-pointer group"
              onClick={() => setShowImageModal(true)}
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x600?text=Blog+Image";
                }}
              />
              {/* Zoom Icon Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <Maximize2 className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* Category Badge Overlay */}
              {blog.category && (
                <div className="absolute top-6 left-6 pointer-events-none">
                  <span className="badge badge-primary badge-lg gap-2">
                    <Tag className="w-4 h-4" />
                    {blog.category}
                  </span>
                </div>
              )}
            </figure>
          )}

          <div className="card-body p-8 md:p-12">
            {/* Blog Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Short Description */}
            {blog.short_description && (
              <p className="text-xl text-base-content/80 mb-6 leading-relaxed">
                {blog.short_description}
              </p>
            )}

            {/* Blog Meta Information */}
            <div className="flex flex-wrap gap-4 pb-6 border-b border-base-300 mb-8">
              <div className="flex items-center gap-2 text-base-content/70">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {formatDate(blog.createdAt || blog.updatedAt)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-base-content/70">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{blog.views || 0} views</span>
              </div>
              {blog.description && (
                <div className="flex items-center gap-2 text-base-content/70">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {formatReadTime(blog.description)} min read
                  </span>
                </div>
              )}
              {blog.comments && blog.comments.length > 0 && (
                <div className="flex items-center gap-2 text-base-content/70">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">
                    {blog.comments.length}{" "}
                    {blog.comments.length === 1 ? "comment" : "comments"}
                  </span>
                </div>
              )}
            </div>

            {/* Blog Description/Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-base-content/90 leading-relaxed whitespace-pre-line"
                style={{ lineHeight: "1.8" }}
              >
                {blog.description}
              </div>
            </div>

            {/* Comments Section */}
            {blog.comments && blog.comments.length > 0 && (
              <div className="mt-12 pt-8 border-t border-base-300">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Comments ({blog.comments.length})
                </h2>
                <div className="space-y-4">
                  {blog.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="card bg-base-200 shadow-sm"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-10 h-10">
                              <span className="text-sm">
                                {comment.author?.charAt(0).toUpperCase() || "U"}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">
                                {comment.author || "Anonymous"}
                              </p>
                              {comment.createdAt && (
                                <span className="text-xs text-base-content/60">
                                  {formatDate(comment.createdAt)}
                                </span>
                              )}
                            </div>
                            <p className="text-base-content/80">
                              {comment.content || comment.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Full Image Modal */}
        {showImageModal && blog.img && (
          <dialog className="modal modal-open">
            <div className="modal-box max-w-7xl w-full p-0 bg-transparent">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2 z-10 bg-base-100"
                onClick={() => setShowImageModal(false)}
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setShowImageModal(false)}>close</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
