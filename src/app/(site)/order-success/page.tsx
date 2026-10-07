import { permanentRedirect } from "next/navigation";

export default function LegacyOrderSuccessPage() {
  permanentRedirect("/");
}
