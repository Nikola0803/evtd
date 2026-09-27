import Image from "next/image";

/** Container-free product artwork. Product data remains precise while the
 * visual language stays abstract, premium, and consistent across the catalog. */
export function ProductVisual({
  name,
  dosage,
  className = "",
  floating = false,
  priority = false,
}: {
  name: string;
  dosage?: string | null;
  className?: string;
  floating?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-ivory-soft ${className}`}>
      <Image
        src="/images/brand/molecular-sculpture.png"
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 50vw, 360px"
        className={`object-cover transition duration-700 group-hover:scale-[1.03] ${floating ? "drop-shadow-xl" : ""}`}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-transparent px-4 pb-4 pt-14 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white">{name}</p>
        {dosage && <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-copper-light">{dosage}</p>}
      </div>
    </div>
  );
}
