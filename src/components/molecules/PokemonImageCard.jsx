import { useEffect, useRef, useState } from "react";
import pokeBallLoading from "../../assets/images/pokeball.gif";
import { imageQueueManager } from "../../utils/imageQueue/index";
import Reload from "../../assets/icons/reload.svg";

export function PokemonImageCard({ imageUrl, pokemonId, pokemonName }) {
  const [imageState, setImageState] = useState("idle"); // idle | loading | success | failed
  const [retryCount, setRetryCount] = useState(0);
  const containerRef = useRef(null);

  // Step 1: Setup Intersection Observer (Lazy Load)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageState === "idle") {
            // Gambar visible & belum di-load → mulai load
            handleStartLoad();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px sebelum masuk viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [imageState]);

  // Step 2: Load image via queue manager
  const handleStartLoad = async () => {
    setImageState("loading");

    try {
      const result = await imageQueueManager.loadImage(imageUrl, 3);

      if (result.success) {
        setImageState("success");
        setRetryCount(result.attempts - 1);
      } else {
        setImageState("failed");
        setRetryCount(result.attempts);
      }
    } catch (error) {
      console.error(error);
      setImageState("failed");
    }
  };

  // Step 3: Manual retry button
  const handleManualRetry = () => {
    setImageState("idle");
    setRetryCount(0);
  };

  // Render based on state

  return (
    <div
      ref={containerRef}
      className="relative w-10 h-10 my-1"
      style={{
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Container untuk semua state - Fixed size */}
      <div
        className="absolute inset-0 border-2 border-black dark:border-white rounded-full bg-slate-200"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Loading State */}
        {(imageState === "idle" || imageState === "loading") && (
          <img
            src={pokeBallLoading}
            className="h-full w-full rounded-full"
            alt="loading"
            style={{
              objectFit: "contain",
              padding: "2px",
            }}
          />
        )}

        {/* Success State */}
        {imageState === "success" && (
          <img
            src={imageUrl}
            className="h-full w-full rounded-full hover:bg-yellow-300 transition-all cursor-pointer"
            alt={pokemonName}
            title={pokemonName}
            style={{
              objectFit: "contain",
              padding: "2px",
            }}
          />
        )}

        {/* Failed State */}
        {imageState === "failed" && (
          <div
            className="grayscale opacity-50	 h-10 w-10 border-2 border-black dark:border-white rounded-full bg-red-200 my-1 flex items-center justify-center cursor-pointer hover:bg-red-300"
            onClick={handleManualRetry}
            title={`Click to retry (Attempts: ${retryCount})`}
          >
            <img
              src={Reload}
              alt="icon reload"
              width="15"
              height="15"
              loading="lazy"
              className="fill-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
