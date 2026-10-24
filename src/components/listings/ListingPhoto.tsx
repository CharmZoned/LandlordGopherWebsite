import Image from "next/image";
import type { ListingPhoto as Photo } from "@/lib/listings/types";
import { ListingIcon } from "./ListingIcons";

type ListingPhotoProps = {
  photo: Photo | undefined;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** A listing image filling its (aspect-ratio) container, with a neutral fallback when none is supplied. */
export function ListingPhoto({ photo, sizes, priority = false, className = "" }: ListingPhotoProps) {
  if (!photo) {
    return (
      <div
        role="img"
        aria-label="No photo available"
        className={`flex flex-col items-center justify-center gap-2 bg-brand-50 text-ink-500 ${className}`}
      >
        <ListingIcon name="home" className="size-10 text-brand-600/60" />
        <span className="text-sm font-semibold">Photo coming soon</span>
      </div>
    );
  }

  return (
    <div className={`relative bg-brand-50 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        // SVG placeholders are already tiny and vector; the optimizer only handles raster images.
        unoptimized={photo.src.endsWith(".svg")}
        className="object-cover"
      />
    </div>
  );
}
