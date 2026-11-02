import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

// 1. danh sách
export const getOrders = async (params = {}) => {
  const res = await axiosInstance.get("/orders", { params });
  return res.data;
};

// 2. chi tiết
export const getOrderById = async (id) => {
  const res = await axiosInstance.get(`/orders/${id}`);
  return res.data;
};

const normalizeOrderPayload = (data) => {
  const statusMap = {
    pending: 0,
    confirmed: 1,
    shipped: 2,
    delivered: 3,
    cancelled: 4,
    "Đang xử lý": 0,
    "Đã xác nhận": 1,
    "Đã gửi": 2,
    "Đã giao": 3,
    "Đã hủy": 4,
  };

  const normalized = { ...data };

  if (normalized.status !== undefined && normalized.status !== null) {
    if (typeof normalized.status === "string") {
      if (statusMap[normalized.status] !== undefined) {
        normalized.status = statusMap[normalized.status];
      } else if (!isNaN(Number(normalized.status))) {
        normalized.status = Number(normalized.status);
      }
    }
    if (typeof normalized.status === "number") {
      normalized.status = Number(normalized.status);
    }
  }

  if (normalized.user_id !== undefined && normalized.user_id !== null) {
    let rawUserId = normalized.user_id;
    if (typeof rawUserId === "object") {
      rawUserId =
        rawUserId.id ??
        rawUserId.user_id ??
        rawUserId.user ??
        rawUserId.data?.user_id ??
        rawUserId.data?.id ??
        rawUserId.userName ??
        rawUserId.name;
    }
    const parsedUserId = Number(rawUserId);
    if (!Number.isNaN(parsedUserId) && parsedUserId > 0) {
      normalized.user_id = parsedUserId;
    } else {
      delete normalized.user_id;
    }
  }

  return normalized;
};

const isPlainObject = (value) =>
  value && typeof value === "object" && value.constructor === Object;

const appendUrlEncoded = (params, value, key) => {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendUrlEncoded(params, item, `${key}[${index}]`);
    });
  } else if (isPlainObject(value)) {
    Object.entries(value).forEach(([subKey, subValue]) => {
      appendUrlEncoded(params, subValue, `${key}[${subKey}]`);
    });
  } else {
    params.append(key, String(value));
  }
};

const toUrlEncoded = (data, prefix = "") => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const paramKey = prefix ? `${prefix}[${key}]` : key;
      appendUrlEncoded(params, value, paramKey);
    }
  });
  return params;
};

const shouldRetryWithDataWrapper = (error) => {
  return (
    error?.status === 500 ||
    error?.message?.includes("Cannot read properties") ||
    error?.message?.includes("user_id") ||
    error?.message?.includes("req.body")
  );
};

const postUrlEncoded = async (url, data) => {
  const bodyString = toUrlEncoded(data).toString();
  const res = await axiosInstance.post(url, bodyString, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res;
};

const putUrlEncoded = async (url, data) => {
  const bodyString = toUrlEncoded(data).toString();
  const res = await axiosInstance.put(url, bodyString, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res;
};

const postUrlEncodedWithDataWrapper = async (url, data) => {
  const res = await axiosInstance.post(
    url,
    toUrlEncoded(data, "data"),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return res;
};

const postUrlEncodedWithOrderWrapper = async (url, data) => {
  const res = await axiosInstance.post(
    url,
    toUrlEncoded({ order: data }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return res;
};

const postUrlEncodedJsonStringWrapper = async (url, data) => {
  const params = new URLSearchParams();
  params.append("data", JSON.stringify(data));
  const res = await axiosInstance.post(url, params.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res;
};

const postUrlEncodedOrderJsonStringWrapper = async (url, data) => {
  const params = new URLSearchParams();
  params.append("order", JSON.stringify(data));
  const res = await axiosInstance.post(url, params.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res;
};

const putUrlEncodedWithDataWrapper = async (url, data) => {
  const res = await axiosInstance.put(
    url,
    toUrlEncoded(data, "data"),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return res;
};

const postJsonWithDataWrapper = async (url, data) => {
  const res = await axiosInstance.post(url, { data });
  return res;
};

const postJsonWithOrderWrapper = async (url, data) => {
  const res = await axiosInstance.post(url, { order: data });
  return res;
};

const putJsonWithDataWrapper = async (url, data) => {
  const res = await axiosInstance.put(url, { data });
  return res;
};

const postFormDataWithDataWrapper = async (url, data) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  const res = await axiosInstance.post(url, formData);
  return res;
};

const appendFormData = (formData, value, key) => {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendFormData(formData, item, `${key}[${index}]`);
    });
  } else if (isPlainObject(value)) {
    Object.entries(value).forEach(([subKey, subValue]) => {
      appendFormData(formData, subValue, `${key}[${subKey}]`);
    });
  } else {
    formData.append(key, value instanceof Date ? value.toISOString() : String(value));
  }
};

const toFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    appendFormData(formData, value, key);
  });
  return formData;
};

const postFormData = async (url, data) => {
  const res = await axiosInstance.post(url, toFormData(data));
  return res;
};

const putFormData = async (url, data) => {
  const res = await axiosInstance.put(url, toFormData(data));
  return res;
};

// 3. tạo
export const createOrder = async (data) => {
  const payload = normalizeOrderPayload(data);
  console.log("📦 Starting createOrder with data:", payload);
  console.log("📦 Order request body (json):", JSON.stringify(payload));

  const alternativeBaseURL = axiosInstance.defaults.baseURL?.replace(/\/api$/, "") || axiosInstance.defaults.baseURL;
  const fallbackBackendHost = "http://localhost:5000";
  const directBackendBaseURL = /localhost:3000/.test(alternativeBaseURL || "") ? fallbackBackendHost : alternativeBaseURL;

  const directAxios = axios.create({
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const directPost = async (path, body, options = {}) => {
    const urlsToTry = [];
    if (directBackendBaseURL) {
      urlsToTry.push(`${directBackendBaseURL}${path}`);
      urlsToTry.push(`${directBackendBaseURL}/api${path}`);
    }
    urlsToTry.push(`http://localhost:5000/api${path}`);
    urlsToTry.push(`http://localhost:5000${path}`);

    for (const url of urlsToTry) {
      try {
        console.log(`📦 Trying direct fallback URL: ${url}`);
        const res = await directAxios.post(url, body, {
          headers: { ...(options.headers || {}), "Content-Type": "application/json", Accept: "application/json" },
        });
        return res;
      } catch (err) {
        console.warn(`⚠️ Direct fallback URL failed: ${url}`, err?.message || err);
      }
    }
    throw new Error("All direct backend fallback URLs failed");
  };

  const fetchPostJson = async (url, body) => {
    console.log(`📦 Trying raw fetch JSON fallback URL: ${url}`);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error(`Fetch JSON fallback failed: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
    }
    return data;
  };

  const fetchPostUrlEncoded = async (url, body) => {
    console.log(`📦 Trying raw fetch URL-encoded fallback URL: ${url}`);
    const params = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (typeof value === "object") {
        params.append(key, JSON.stringify(value));
      } else {
        params.append(key, String(value));
      }
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
      body: params.toString(),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error(`Fetch URL-encoded fallback failed: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
    }
    return data;
  };

  const fetchPostJsonWrapper = async (url, body) => {
    console.log(`📦 Trying raw fetch JSON wrapper fallback URL: ${url}`);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({ data: body }),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error(`Fetch JSON wrapper fallback failed: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
    }
    return data;
  };

  const fetchPostOrderJsonWrapper = async (url, body) => {
    console.log(`📦 Trying raw fetch JSON order-wrapper fallback URL: ${url}`);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({ order: body }),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error(`Fetch JSON order-wrapper fallback failed: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
    }
    return data;
  };

  const fetchPostUrlEncodedOrderWrapper = async (url, body) => {
    console.log(`📦 Trying raw fetch URL-encoded order-wrapper fallback URL: ${url}`);
    const params = new URLSearchParams();
    params.append("order", JSON.stringify(body));
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
      body: params.toString(),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error(`Fetch URL-encoded order-wrapper fallback failed: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
    }
    return data;
  };

  const fetchPostFormData = async (url, body) => {
    console.log(`📦 Trying raw fetch FormData fallback URL: ${url}`);
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      formData.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
    });
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error(`Fetch FormData fallback failed: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
    }
    return data;
  };

  const fetchPostFormDataWrapper = async (url, body) => {
    console.log(`📦 Trying raw fetch FormData wrapper fallback URL: ${url}`);
    const formData = new FormData();
    formData.append("data", JSON.stringify(body));
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) {
      throw new Error(`Fetch FormData wrapper fallback failed: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`);
    }
    return data;
  };

  const requestBody = { order: payload };

  try {
    const res = await axiosInstance.post("/orders", requestBody);
    console.log("✅ Order created successfully:", res.data);
    return res.data;
  } catch (error) {
    console.warn("⚠️ JSON request failed, will try fallback. Error details:", JSON.stringify(error, null, 2), error);
    console.log("📦 Attempting fallback 1: JSON wrapper");

    try {
      const retry1 = await postJsonWithOrderWrapper("/orders", payload);
      console.log("✅ JSON order wrapper retry succeeded:", retry1.data);
      return retry1.data;
    } catch (retry1Error) {
      console.error("❌ JSON order wrapper retry failed:", retry1Error);
      console.log("📦 Attempting fallback 1b: JSON data wrapper");
      try {
        const retry1b = await postJsonWithDataWrapper("/orders", payload);
        console.log("✅ JSON data wrapper retry succeeded:", retry1b.data);
        return retry1b.data;
      } catch (retry1bError) {
        console.error("❌ JSON data wrapper retry failed:", retry1bError);
        console.log("📦 Attempting fallback 2: URL-encoded");
        try {
          const retry2 = await postUrlEncoded("/orders", payload);
          console.log("✅ URL-encoded retry succeeded:", retry2.data);
          return retry2.data;
        } catch (retry2Error) {
          console.error("❌ URL-encoded retry failed:", retry2Error);
          console.log("📦 Attempting fallback 3: URL-encoded wrapper");
          try {
            const retry3 = await postUrlEncodedWithDataWrapper("/orders", payload);
            console.log("✅ URL-encoded data wrapper retry succeeded:", retry3.data);
            return retry3.data;
          } catch (retry3Error) {
            console.error("❌ URL-encoded data wrapper retry failed:", retry3Error);
            console.log("📦 Attempting fallback 4: URL-encoded JSON-string wrapper");
            try {
              const retry4 = await postUrlEncodedJsonStringWrapper("/orders", payload);
              console.log("✅ URL-encoded JSON-string wrapper retry succeeded:", retry4.data);
              return retry4.data;
            } catch (retry4Error) {
              console.error("❌ URL-encoded JSON-string wrapper failed:", retry4Error);
              console.log("📦 Attempting fallback 4b: URL-encoded order wrapper");
              try {
                const retry4b = await postUrlEncodedWithOrderWrapper("/orders", payload);
                console.log("✅ URL-encoded order wrapper retry succeeded:", retry4b.data);
                return retry4b.data;
              } catch (retry4bError) {
                console.error("❌ URL-encoded order wrapper failed:", retry4bError);
                console.log("📦 Attempting fallback 5: FormData");
                try {
                  const retry5 = await postFormData("/orders", payload);
                  console.log("✅ FormData retry succeeded:", retry5.data);
                  return retry5.data;
                } catch (retry5Error) {
                  console.error("❌ FormData retry failed:", retry5Error);
                  console.log("📦 Attempting fallback 6: FormData with data wrapper");
                  try {
                    const retry6 = await postFormDataWithDataWrapper("/orders", payload);
                    console.log("✅ FormData wrapper retry succeeded:", retry6.data);
                    return retry6.data;
                  } catch (retry6Error) {
                    console.error("❌ FormData wrapper failed:", retry6Error);
                    if (alternativeBaseURL) {
                      console.log("📦 Attempting fallback 7: direct /orders without /api prefix");
                      try {
                        const retry7 = await directPost("/orders", payload);
                        console.log("✅ Direct /orders retry succeeded:", retry7.data);
                        return retry7.data;
                      } catch (retry7Error) {
                        console.error("❌ Direct /orders retry failed:", retry7Error);
                        console.log("📦 Attempting fallback 8: raw fetch JSON to http://localhost:5000/api/orders");
                        try {
                          const fetchResult = await fetchPostJson("http://localhost:5000/api/orders", payload);
                          console.log("✅ Raw fetch JSON fallback succeeded:", fetchResult);
                          return fetchResult;
                        } catch (fetchError) {
                          console.error("❌ Raw fetch JSON fallback failed:", fetchError);
                          console.log("📦 Attempting fallback 9: raw fetch JSON wrapper to http://localhost:5000/api/orders");
                          try {
                            const fetchJsonWrapperResult = await fetchPostJsonWrapper("http://localhost:5000/api/orders", payload);
                            console.log("✅ Raw fetch JSON wrapper fallback succeeded:", fetchJsonWrapperResult);
                            return fetchJsonWrapperResult;
                          } catch (fetchJsonWrapperError) {
                            console.error("❌ Raw fetch JSON wrapper fallback failed:", fetchJsonWrapperError);
                            console.log("📦 Attempting fallback 9b: raw fetch JSON order wrapper to http://localhost:5000/api/orders");
                            try {
                              const fetchOrderJsonWrapperResult = await fetchPostOrderJsonWrapper("http://localhost:5000/api/orders", payload);
                              console.log("✅ Raw fetch JSON order wrapper fallback succeeded:", fetchOrderJsonWrapperResult);
                              return fetchOrderJsonWrapperResult;
                            } catch (fetchOrderJsonWrapperError) {
                              console.error("❌ Raw fetch JSON order wrapper fallback failed:", fetchOrderJsonWrapperError);
                              console.log("📦 Attempting fallback 10: raw fetch URL-encoded to http://localhost:5000/api/orders");
                              try {
                                const fetchUrlEncodedResult = await fetchPostUrlEncoded("http://localhost:5000/api/orders", payload);
                                console.log("✅ Raw fetch URL-encoded fallback succeeded:", fetchUrlEncodedResult);
                                return fetchUrlEncodedResult;
                              } catch (fetchUrlError) {
                                console.error("❌ Raw fetch URL-encoded fallback failed:", fetchUrlError);
                                console.log("📦 Attempting fallback 10b: raw fetch URL-encoded order wrapper to http://localhost:5000/api/orders");
                                try {
                                  const fetchUrlEncodedOrderResult = await fetchPostUrlEncodedOrderWrapper("http://localhost:5000/api/orders", payload);
                                  console.log("✅ Raw fetch URL-encoded order wrapper fallback succeeded:", fetchUrlEncodedOrderResult);
                                  return fetchUrlEncodedOrderResult;
                                } catch (fetchUrlOrderError) {
                                  console.error("❌ Raw fetch URL-encoded order wrapper fallback failed:", fetchUrlOrderError);
                                  console.log("📦 Attempting fallback 11: raw fetch FormData to http://localhost:5000/api/orders");
                                  try {
                                    const fetchFormDataResult = await fetchPostFormData("http://localhost:5000/api/orders", payload);
                                    console.log("✅ Raw fetch FormData fallback succeeded:", fetchFormDataResult);
                                    return fetchFormDataResult;
                                  } catch (fetchFormDataError) {
                                    console.error("❌ Raw fetch FormData fallback failed:", fetchFormDataError);
                                    console.log("📦 Attempting fallback 12: raw fetch FormData wrapper to http://localhost:5000/api/orders");
                                    try {
                                      const fetchFormDataWrapperResult = await fetchPostFormDataWrapper("http://localhost:5000/api/orders", payload);
                                      console.log("✅ Raw fetch FormData wrapper fallback succeeded:", fetchFormDataWrapperResult);
                                      return fetchFormDataWrapperResult;
                                    } catch (fetchFormDataWrapperError) {
                                      console.error("❌ Raw fetch FormData wrapper fallback failed:", fetchFormDataWrapperError);
                                      console.log("❌ All createOrder retries failed. Final error:", fetchFormDataWrapperError);
                                      return Promise.reject(fetchFormDataWrapperError);
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    console.log("❌ All createOrder retries failed. Final error:", retry6Error);
                    return Promise.reject(retry6Error);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// 4. update FULL / partial (nếu backend hỗ trợ PATCH)
export const updateOrder = async (id, data) => {
  const payload = normalizeOrderPayload(data);
  try {
    const res = await axiosInstance.put(`/orders/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log("📦 Falling back to URL-encoded request for updateOrder");
    if (shouldRetryWithDataWrapper(error)) {
      try {
        const retry = await putUrlEncoded(`/orders/${id}`, payload);
        return retry.data;
      } catch (retryError) {
        try {
          const retry2 = await putFormData(`/orders/${id}`, payload);
          return retry2.data;
        } catch (retry2Error) {
          try {
            const retry3 = await putJsonWithDataWrapper(`/orders/${id}`, payload);
            return retry3.data;
          } catch (retry3Error) {
            if (retry3Error.status === 404 || retry3Error.status === 405) {
              const res = await axiosInstance.patch(`/orders/${id}`, payload);
              return res.data;
            }
            const retry4 = await putUrlEncodedWithDataWrapper(`/orders/${id}`, payload);
            return retry4.data;
          }
        }
      }
    }

    if (error.status === 404 || error.status === 405) {
      const res = await axiosInstance.patch(`/orders/${id}`, payload);
      return res.data;
    }
    return Promise.reject(error);
  }
};

// 5. update STATUS (API riêng của bạn)
export const updateOrderStatus = async (id, data) => {
  const payload = normalizeOrderPayload(data);
  try {
    const res = await axiosInstance.put(`/orders/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log("📦 Falling back to URL-encoded request for updateOrderStatus");
    if (shouldRetryWithDataWrapper(error)) {
      try {
        const retry = await putUrlEncoded(`/orders/${id}`, payload);
        return retry.data;
      } catch (retryError) {
        try {
          const retry2 = await putFormData(`/orders/${id}`, payload);
          return retry2.data;
        } catch (retry2Error) {
          try {
            const retry3 = await putJsonWithDataWrapper(`/orders/${id}`, payload);
            return retry3.data;
          } catch (retry3Error) {
            if (retry3Error.status === 404 || retry3Error.status === 405) {
              const res = await axiosInstance.patch(`/orders/${id}`, payload);
              return res.data;
            }
            const retry4 = await putUrlEncodedWithDataWrapper(`/orders/${id}`, payload);
            return retry4.data;
          }
        }
      }
    }
    if (error.status === 404 || error.status === 405) {
      const res = await axiosInstance.patch(`/orders/${id}`, payload);
      return res.data;
    }
    return Promise.reject(error);
  }
};

// 6. xoá
export const deleteOrder = async (id) => {
  const res = await axiosInstance.delete(`/orders/${id}`);
  return res.data;
};