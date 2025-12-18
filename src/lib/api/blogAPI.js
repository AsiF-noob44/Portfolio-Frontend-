import axiosInstance from "../axiosInstance.js";

/**
 * Fetch all blogs with optional filters, pagination, and sorting
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.category - Filter by category
 * @param {string} params.search - Search in title/description
 * @param {string} params.sortBy - Sort option: 'popular', 'oldest', 'title-asc', 'title-desc'
 * @param {string} params.startDate - Filter from date
 * @param {string} params.endDate - Filter to date
 * @returns {Promise} Response with blogs and pagination data
 */
export const getAllBlogs = async (params = {}) => {
  const queryParams = new URLSearchParams();

  // Add parameters only if they exist
  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);
  if (params.category) queryParams.append("category", params.category);
  if (params.search) queryParams.append("search", params.search);
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.startDate) queryParams.append("startDate", params.startDate);
  if (params.endDate) queryParams.append("endDate", params.endDate);

  const queryString = queryParams.toString();
  const url = `/blogs${queryString ? `?${queryString}` : ""}`;

  return axiosInstance.get(url);
};

/**
 * Fetch a single blog by ID
 * @param {string} id - Blog ID
 * @returns {Promise} Response with blog data
 */
export const getBlogById = async (id) => {
  return axiosInstance.get(`/blogs/${id}`);
};
