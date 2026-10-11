import { permanentRedirect } from "next/navigation";

export default function LegacyAmbassadorsPage() {
  permanentRedirect("/about");
}
