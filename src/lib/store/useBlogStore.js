import { create } from "zustand";
import {
  deleteBlogByIdAPI,
  getAllBlogsAPI,
  getBlogByIdAPI,
} from "../api/blogAPI.js";

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
      const response = await getAllBlogsAPI(params);
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
      return response;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  fetchSingleBlog: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await getBlogByIdAPI(id);
      set({ blogs: [response.data], loading: false });
      return response;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  deleteBlogById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await deleteBlogByIdAPI(id);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== id),
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },
}));
export default useBlogStore;
