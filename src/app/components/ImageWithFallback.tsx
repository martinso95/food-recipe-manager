"use client";

import Image from "next/image";
import React, { useState } from "react";

type Props = {
    src: string | undefined;
    alt: string;
    fallback: string;
    width: number;
    height: number;
    className?: string;
};

function ImageWithFallback({
    src,
    alt,
    fallback,
    width,
    height,
    className,
}: Props) {
    const [error, setError] = useState(src == null);
    return (
        <Image
            src={!error && src != null ? src : fallback}
            alt={alt}
            width={width}
            height={height}
            onError={() => setError(true)}
            className={className}
        />
    );
}

export default ImageWithFallback;
