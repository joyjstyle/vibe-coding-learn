import { auth, isLoginEnabled } from "@/lib/platform/auth";
import { isDatabaseMode } from "@/lib/platform/db";
import { fileResponse } from "@/lib/file-response";
import { fileStorage, workStore } from "@/lib/platform/stores";
import { getStudent, isSupervisor } from "@/lib/platform/supervisors";

/** A student's evidence file, for a signed-in supervisor: only files in that student's submitted work. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string; fileId: string }> }) {
  const notFound = () => new Response("Not found", { status: 404 });
  if (!isDatabaseMode() || !isLoginEnabled()) return notFound();
  const me = await auth.getCurrentIntern();
  if (!me || !(await isSupervisor(me.id))) return notFound();
  const { id, fileId } = await params;
  const student = await getStudent(decodeURIComponent(id));
  if (!student) return notFound();
  const fid = decodeURIComponent(fileId);
  const work = await workStore.get(student.id);
  const submitted = work.submissions.some((s) => s.items.some((i) => i.kind === "file" && i.file.id === fid));
  if (!submitted) return notFound();
  const file = await fileStorage.read(student.id, fid);
  return file ? fileResponse(file.ref, file.bytes) : notFound();
}
