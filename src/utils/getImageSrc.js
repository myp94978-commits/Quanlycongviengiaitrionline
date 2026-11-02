const getBackendBase = () => {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (rawUrl) {
    return rawUrl.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  }
  return "http://localhost:5000";
};

// Danh sách ảnh mặc định cho các loại hoa
const getDefaultFlowerImage = (productName = "") => {
  const name = productName.toLowerCase();

  // Mapping ảnh mặc định theo tên sản phẩm
  const flowerImages = {
    'hoa lan': 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=400&fit=crop',
    'hoa hong': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    'hoa tuoi': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
    'tulip': 'https://images.unsplash.com/photo-1520637836862-4d197d17c155?w=400&h=400&fit=crop',
    'hoa lele': 'https://images.unsplash.com/photo-1464822759844-d150f39ac1ac?w=400&h=400&fit=crop',
    'hoa qua': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'hoa khô': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    'hoa chậu': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    'hoa trang trí': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
  };

  // Tìm ảnh phù hợp theo tên
  for (const [key, url] of Object.entries(flowerImages)) {
    if (name.includes(key)) {
      return url;
    }
  }

  // Ảnh mặc định chung cho hoa
  return 'https://images.unsplash.com/photo-1464822759844-d150f39ac1ac?w=400&h=400&fit=crop';
};

const getImageSrc = (value, productName = "") => {
  if (!value || typeof value !== "string") {
    // Trả về ảnh mặc định nếu không có value
    return getDefaultFlowerImage(productName);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    // Trả về ảnh mặc định nếu value rỗng
    return getDefaultFlowerImage(productName);
  }

  if (trimmed.startsWith("http") || trimmed.startsWith("data:")) {
    return encodeURI(trimmed);
  }

  const backendBase = getBackendBase();
  if (trimmed.startsWith("/")) {
    // Nếu backend trả về đường dẫn tuyệt đối như /images/xxx, dùng host backend để tải ảnh.
    return backendBase ? encodeURI(`${backendBase}${trimmed}`) : encodeURI(trimmed);
  }

  if (backendBase) {
    // Các ảnh sản phẩm trên backend thường lưu file name, nên cần thêm đường dẫn uploads
    const uploadPath = trimmed.startsWith("uploads/") ? trimmed : `uploads/${trimmed}`;
    return encodeURI(`${backendBase}/${uploadPath}`);
  }
  return encodeURI(`/${trimmed}`);
};

export default getImageSrc;
