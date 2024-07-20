import { BASE_URL } from "../utils/constants";

export const fetchFromAPI = async <T>(endpoint: string): Promise<T> => {
  try {
    const url = `${BASE_URL}${endpoint}`
    console.log('URL:', url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};