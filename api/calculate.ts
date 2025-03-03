import axios from "axios";

interface SimilarityResponse {
  similarity: string;
  error?: string;
}

const calculateSimilarity = async (
  pixels: number[],
  category: string,
  productName: string
): Promise<SimilarityResponse> => {
  const response = await axios.post<SimilarityResponse>(
    "http://192.168.50.192:80/calculate-similarity",
    {
      pixels,
      category,
      productName,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export default calculateSimilarity;
