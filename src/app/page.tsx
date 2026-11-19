import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getIdentity } from "@/lib/identity";
import { isDatabaseMode } from "@/lib/platform/db";
import { isLoginEnabled } from "@/lib/platform/auth";

/** First visit goes to the Welcome tour; after that, straight to Home. */
export default async function Root() {
  await connection();
  const { intern, settings } = await getIdentity();
  if (isDatabaseMode() && isLoginEnabled() && !intern) redirect("/sign-in");
  redirect(intern && !settings.welcomeCompletedAt ? "/welcome" : "/home");
}
