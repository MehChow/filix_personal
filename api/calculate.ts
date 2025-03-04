import axios from "~/api/request";

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
    "/calculate-similarity",
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
