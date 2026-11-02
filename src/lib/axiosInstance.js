import axios from "axios";

const getApiBaseUrl = () => {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "";
  const defaultUrl = "http://localhost:5000/api";

  if (!rawUrl) {
    return defaultUrl;
  }

  let normalizedUrl = rawUrl;
  if (normalizedUrl.startsWith(":")) {
    normalizedUrl = `http://localhost${normalizedUrl}`;
  } else if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = `http://${normalizedUrl}`;
  }

  normalizedUrl = normalizedUrl.replace(/\/+$|\s+/g, "");
  if (!normalizedUrl.endsWith("/api")) {
    normalizedUrl = `${normalizedUrl}/api`;
  }

  const isFrontendHost = /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:3000)?\/api$/i.test(normalizedUrl);
  if (isFrontendHost) {
    console.warn("NEXT_PUBLIC_API_URL points to frontend host 3000; falling back to backend http://localhost:5000/api");
    return defaultUrl;
  }

  return normalizedUrl;
};

const apiBaseUrl = getApiBaseUrl();
if (process.env.NODE_ENV === "development") {
  console.debug("Axios API baseURL:", apiBaseUrl);
}

const axiosInstance = axios.create({
  baseURL: apiBaseUrl, // địa chỉ API backend
  timeout: 5000, // thời gian chờ tối đa (5 giây) trước khi request bị hủy
  headers: {
    "Content-Type": "application/json", // dữ liệu gửi lên server ở dạng JSON
  },
  transformResponse: [
    (data) => {
      if (data === undefined || data === null || data === "") {
        return data;
      }
      if (typeof data !== "string") {
        return data;
      }
      try {
        return JSON.parse(data);
      } catch (error) {
        return data;
      }
    },
  ],
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token đã lưu trong localStorage (chỉ trên client)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Normalize baseURL nếu biến env được cấu hình sai như ":5000/api"
    if (config.baseURL?.startsWith(":")) {
      config.baseURL = `http://localhost${config.baseURL}`;
    }

    // Bắt buộc phải return config để request tiếp tục gửi đi
    return config;
  },
  // Nếu có lỗi xảy ra trước khi request được gửi
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("🔍 Axios interceptor caught error:", error);
    const responseData = error.response?.data ?? null;
    const statusCode = error.response?.status;
    const errorMessage =
      responseData?.message ||
      responseData?.error ||
      error.message ||
      error.response?.statusText ||
      `HTTP ${statusCode}` ||
      "Unknown error";

    const errorData = {
      message: errorMessage,
      status: statusCode || 500,
      data: responseData || null,
      fullError: {
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
        },
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        },
      },
    };
    console.log("🔍 Normalized error data:", errorData);
    return Promise.reject(errorData);
  }
);
export default axiosInstance;
