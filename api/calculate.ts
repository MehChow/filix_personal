import apiService from "./apiService";

interface SimilarityResponse {
  similarity: string;
  error?: string;
}

const calculateSimilarity = async (
  pixels: number[],
  category: string,
  productName: string
): Promise<SimilarityResponse> => {
  const endpoint = "/api/scan.calculate/calculateSimilarity";
  const response = await apiService.post(endpoint, {
    pixels,
    category,
    productName,
  });

  return response.data;
};

export default calculateSimilarity;
