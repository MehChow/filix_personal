import { useEffect, useState } from "react";
import Zeroconf from "react-native-zeroconf";

interface Service {
  name: string;
  fullName: string;
  host: string;
  port: number;
  addresses: string[];
}

const useScanIP = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [zeroconf] = useState(() => new Zeroconf());

  useEffect(() => {
    // Add event listeners
    zeroconf.on("start", () => {
      console.log("Scan started");
      setIsScanning(true);
    });

    zeroconf.on("stop", () => {
      console.log("Scan stopped");
      setIsScanning(false);
    });

    zeroconf.on("found", (name: string) => {
      console.log("Found LinkSquare device:", name);
    });

    zeroconf.on("resolved", (service: Service) => {
      console.log("Resolved LinkSquare device:", service);
      setServices((prev) => [...prev, service]);
    });

    zeroconf.on("remove", (name: string) => {
      console.log("LinkSquare device removed:", name);
      setServices((prev) => prev.filter((s) => s.name !== name));
    });

    zeroconf.on("error", (err: Error) => {
      console.error("Zeroconf error:", err);
    });

    // Cleanup
    return () => {
      zeroconf.removeDeviceListeners();
      zeroconf.stop();
    };
  }, [zeroconf]);

  const startScan = () => {
    setServices([]); // Clear previous results
    // Scan specifically for LinkSquare devices
    zeroconf.scan("linksquare1", "tcp", "local.");
  };

  const stopScan = () => {
    zeroconf.stop();
  };

  return {
    isScanning,
    services,
    startScan,
    stopScan,
  };
};

export default useScanIP;
