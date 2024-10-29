const API_URL = "https://fakestoreapi.com";

// product fetch
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// id fetch
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

// id kategooria
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching product categories:", error);
  }
};
