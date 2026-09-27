import { ProductVisual } from "@/components/ui/ProductVisual";

export type GalleryMedia = { type: "image" | "video"; src: string };

/** Product-page artwork deliberately stays abstract and container-free. */
export function MediaGallery({
  title,
  dosage,
}: {
  name: string;
  title: string;
  dosage: string | null;
  image?: string;
  gallery?: GalleryMedia[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone bg-ivory-soft shadow-sm">
      <div className="aspect-square w-full">
        <ProductVisual name={title} dosage={dosage} priority className="h-full w-full" />
      </div>
    </div>
  );
}
