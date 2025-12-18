import { create } from "zustand";
import { getAllBlogs } from "../api/blogAPI.js";

const useBlogStore = create((set) => ({
  blogs: null,
  loading: false,
  error: null,
  fetchBlogs: async (params) => {
    try {
      set({ loading: true, error: null });
      const response = await getAllBlogs(params);
      set({ blogs: response.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
export default useBlogStore;
