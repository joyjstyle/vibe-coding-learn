/** The current request's language and messages. Server-side only. */
import { cookies } from "next/headers";
import { LANG_COOKIE, parseLang, type Lang } from "./lang";
import { messages, type Messages } from "./messages";

export async function getLang(): Promise<Lang> {
  return parseLang((await cookies()).get(LANG_COOKIE)?.value);
}

/** Messages for the current request: `const t = await getT(); t["nav.home"]`. */
export async function getT(): Promise<Messages> {
  return messages[await getLang()];
}

export { messages };
export type { Lang, Messages };
