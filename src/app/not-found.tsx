import Link from "next/link";
import { platform } from "@/lib/content/curriculum";
import { AppFrame } from "@/components/AppFrame";
import { LangToggle } from "@/components/LangToggle";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <AppFrame
      bar={
        <header className="ob-topbar" data-surface="dark">
          <Link className="ob-brand" href="/home">
            {platform.name}
          </Link>
          <LangToggle />
        </header>
      }
    >
      <PageHeader title="Page not found" lead="This address does not match a page in Genie Lab. Check the link, or go to Home." />
      <p className="ob-p">
        <Link className="ob-btn ob-btn--primary" href="/home">
          Go to Home
        </Link>
      </p>
    </AppFrame>
  );
}
