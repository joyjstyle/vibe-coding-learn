/**
 * Every message file, merged. Each file owns a key prefix so keys never collide:
 * common ("lang."), pages ("pages."), ui ("ui."), lib ("lib.").
 */
import type { Lang } from "../lang";
import { common } from "./common";
import { lib } from "./lib";
import { pages } from "./pages";
import { ui } from "./ui";

const en = { ...common.en, ...pages.en, ...ui.en, ...lib.en };
const vi: typeof en = { ...common.vi, ...pages.vi, ...ui.vi, ...lib.vi };

export type Messages = typeof en;
export const messages: Record<Lang, Messages> = { en, vi };
