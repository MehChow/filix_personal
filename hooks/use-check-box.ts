import { useCallback, useState } from "react";

const useCheckBox = () => {
  const [keepSignIn, setKeepSignIn] = useState(false);

  const onCheckedChange = useCallback((checked: boolean) => {
    setKeepSignIn(checked);
  }, []);

  return {
    keepSignIn,
    onCheckedChange,
  };
};

export default useCheckBox;
