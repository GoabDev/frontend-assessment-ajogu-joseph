"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const FALLBACK_IMAGE_SRC = "/product-fallback.svg";

export function ProductImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => {
        if (currentSrc !== FALLBACK_IMAGE_SRC) {
          setCurrentSrc(FALLBACK_IMAGE_SRC);
        }
      }}
    />
  );
}
