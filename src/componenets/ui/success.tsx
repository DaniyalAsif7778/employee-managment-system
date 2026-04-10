import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const hideTimer = setTimeout(() => setVisible(false), duration);
    const closeTimer = setTimeout(onClose, duration + 300); // allow exit animation
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        bg-green-500 text-white font-semibold
        rounded-lg shadow-lg overflow-hidden
        transform transition-all duration-300
        ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        w-80
      `}
      style={{ pointerEvents: "auto" }}
    >
      {/* Content */}
      <div className="p-4">{message}</div>

      {/* Progress indicator */}
      <div className="relative h-1 w-full bg-green-700">
        <div
          className="absolute inset-0 bg-white"
          style={{
            animation: `progress ${duration}ms linear forwards`,
          }}
        ></div>
      </div>
    </div>
  );
}
export default   Toast