import { create } from "zustand";
import { getAllBlogs } from "../api/blogAPI.js";

const useBlogStore = create((set) => ({
  blogs: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    limit: 9,
    hasNextPage: false,
    hasPrevPage: false,
  },
  fetchBlogs: async (params) => {
    try {
      set({ loading: true, error: null });
      const response = await getAllBlogs(params);
      set({
        blogs: response.data.blogs,
        pagination: {
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalBlogs: response.data.totalBlogs,
          limit: response.data.limit,
          hasNextPage: response.data.hasNextPage,
          hasPrevPage: response.data.hasPrevPage,
        },
        loading: false,
      });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
export default useBlogStore;
