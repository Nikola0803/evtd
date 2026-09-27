import { permanentRedirect } from "next/navigation";

export default function LegacyCoasPage() {
  permanentRedirect("/peptides");
}
