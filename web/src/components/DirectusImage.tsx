import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

function isLocalhostUrl(url: string) {
  return (
    url.includes("localhost:") ||
    url.includes("127.0.0.1") ||
    url.includes("[::1]")
  );
}

export function DirectusImage({ src, alt, ...props }: Props) {
  const unoptimized = isLocalhostUrl(src);
  return <Image src={src} alt={alt} unoptimized={unoptimized} {...props} />;
}
