import { useState } from "react";

interface AlertMessage {
  title: string;
  content: string;
}

const useAlert = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: "", content: "" });

  const createAlert = (alert: AlertMessage) => {
    setAlertOpen(true);
    setAlertMessage(alert);
  };

  return {
    alertOpen,
    setAlertOpen,
    alertMessage,
    createAlert,
  };
};

export default useAlert;
