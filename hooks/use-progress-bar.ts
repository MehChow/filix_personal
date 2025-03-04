import { useEffect, useState } from "react";

/**
 * A custom hook for animating the progress bar in the result page.
 *
 * @description
 * This hook is used for handling the animation of the progress bar based on the similarity value.
 */
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
