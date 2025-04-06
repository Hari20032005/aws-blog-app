// Function to validate image URLs
export const validateImageUrl = (url) => {
  if (!url) return true;
  
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Function to get a placeholder image if URL is invalid
export const getImageWithFallback = (url, fallbackUrl = 'https://via.placeholder.com/800x400?text=No+Image') => {
  if (!url) return fallbackUrl;
  return url;
};

// Function to extract image dimensions from URL (if available)
export const getImageDimensions = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      });
    };
    img.onerror = () => {
      resolve({
        width: 800,
        height: 400,
        aspectRatio: 2
      });
    };
    img.src = url;
  });
};
