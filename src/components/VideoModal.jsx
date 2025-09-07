import React, { useRef, useEffect, useState } from "react";

export default function VideoModal({ open, src, onClose }) {
  const modalRef = useRef();
  const videoRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  useEffect(() => {
    setError("");
    if (open && videoRef.current) {
      const v = videoRef.current;
      v.load();
      const playPromise = v.play?.();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(() => setError("")).catch(() => {});
      }
    }
  }, [open, src]);

  const describeMediaError = (el) => {
    const err = el?.error;
    if (!err) return "";
    const codes = {
      1: "Aborted",
      2: "Network", 
      3: "Decode", 
      4: "Src not supported"
    };
    return codes[err.code] || `Error code ${err.code}`;
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div
        ref={modalRef}
        className="rounded-xl p-0 w-auto max-w-none relative flex flex-col items-center justify-center"
        style={{ width: "auto", maxWidth: "90vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={src}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="rounded-lg shadow-lg"
          style={{
            background: "#000",
            outline: "none",
            maxWidth: "90vw",
            maxHeight: "80vh",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block"
          }}
          preload="metadata"
          onCanPlay={() => {
            const v = videoRef.current;
            if (v) {
              const p = v.play?.();
              if (p && typeof p.then === "function") p.then(() => setError("")).catch(() => {});
            }
          }}
          onError={() => {
            const v = videoRef.current;
            const reason = describeMediaError(v);
            console.error("Video error:", reason, { src });
            setError("This video can't be played. Try re-encoding to H.264/AAC.");
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
        {error && (
          <div className="mt-2 text-sm text-red-400 font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
}
