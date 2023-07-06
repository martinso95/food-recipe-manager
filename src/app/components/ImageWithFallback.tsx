"use client";

import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

type Props = Omit<ImageProps, "src"> & {
    src: string | undefined | null;
    fallback: string;
    className?: string;
};

function ImageWithFallback({
    src,
    alt,
    fallback,
    className = "",
    ...rest
}: Props) {
    const [error, setError] = useState(false);

    return (
        <Image
            {...rest}
            src={!error && src != null ? src : fallback}
            alt={alt}
            onError={() => setError(true)}
            className={className}
        />
    );
}

export default ImageWithFallback;
