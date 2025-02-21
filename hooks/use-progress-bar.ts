import { useEffect, useState } from "react";

const useProgressBar = (similarityValue: number) => {
  // Progress animation
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(similarityValue), 500);
    return () => clearTimeout(timer);
  }, []);

  return { progress };
};

export default useProgressBar;
