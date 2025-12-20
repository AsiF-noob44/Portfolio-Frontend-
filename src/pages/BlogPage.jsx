import { useEffect, useState } from "react";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import useBlogStore from "./../lib/store/useBlogStore";

const BlogPage = () => {
  const { blogs, loading, error, fetchBlogs, pagination } = useBlogStore();

  // Filter and sorting states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Single effect to fetch blogs when any filter changes
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 9,
    };

    if (debouncedSearch) params.search = debouncedSearch;
    if (sortBy) params.sortBy = sortBy;

    fetchBlogs(params);
  }, [currentPage, debouncedSearch, sortBy, fetchBlogs]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSortBy("");
    setCurrentPage(1);
    toast.success("Filters cleared");
  };

  if (loading && !blogs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    toast.error(error.message || "Failed to load blogs");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error.message || "Failed to load blogs"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Blogs</h1>
          <p className="text-lg text-base-content/70">
            Explore my latest articles and insights on various topics
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blogs by title or description..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Sort By */}
            <select
              className="select select-bordered w-full md:w-auto"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              disabled={loading}
            >
              <option value="">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>

            {/* Clear Filters */}
            <button
              className="btn btn-ghost"
              onClick={handleClearFilters}
              disabled={loading}
            >
              Clear Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-base-content/70">
            <p>
              Showing {blogs?.length || 0} of {pagination.totalBlogs} blogs
            </p>
            {loading && (
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span className="loading loading-spinner loading-md"></span>
                <span>Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Blog Grid */}
        {blogs && blogs.length > 0 ? (
          <div className="relative">
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-base-200/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center gap-3">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <span className="text-lg font-semibold">
                    Loading blogs...
                  </span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Blog Image */}
                  <figure className="relative h-48 overflow-hidden">
                    <img
                      src={blog.img || "/placeholder-blog.jpg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Blog+Image";
                      }}
                    />
                    {/* Category Badge */}
                    {blog.category && (
                      <div className="absolute top-3 left-3">
                        <span className="badge badge-soft badge-primary badge-sm">
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </figure>

                  <div className="card-body">
                    {/* Blog Title */}
                    <h2 className="card-title line-clamp-2 h-14">
                      {blog.title}
                    </h2>

                    {/* Short Description */}
                    {blog.short_description && (
                      <p className="text-sm text-base-content/70 line-clamp-2">
                        {blog.short_description}
                      </p>
                    )}

                    {/* Blog Stats */}
                    <div className="flex items-center gap-4 text-sm text-base-content/60 mt-2">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views || 0} views</span>
                      </div>
                      {blog.createdAt && (
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-info btn-sm font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold mb-2">No blogs found</h3>
            <p className="text-base-content/60 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button className="btn btn-primary" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {blogs && blogs.length > 0 && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {/* Previous Button */}
            <button
              className="btn btn-outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage || loading}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="join">
              {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // Show first, last, current, and adjacent pages
                if (
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      className={`join-item btn ${
                        currentPage === pageNum ? "btn-active" : ""
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <button
                      key={pageNum}
                      className="join-item btn btn-disabled"
                    >
                      ...
                    </button>
                  );
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <button
              className="btn btn-outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage || loading}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
