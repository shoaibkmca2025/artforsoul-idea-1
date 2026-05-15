"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A plain <img> with a soft, on-brand fallback if the image fails to load.
 * Use anywhere we render user-supplied or third-party image URLs.
 */
export default function SafeImage({
  src,
  alt = "",
  className,
  fallbackText,
}: {
  src: string;
  alt?: string;
  className?: string;
  fallbackText?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-soft via-cream-200 to-sage-300 text-earth-700",
          className
        )}
      >
        <span className="px-4 text-center font-script text-xl opacity-70">
          {fallbackText || alt || "art for soul"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
