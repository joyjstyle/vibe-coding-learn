/**
 * Supervisor accounts and the student list they see. Database mode only: without a
 * database there are no accounts, so nobody is a supervisor.
 */
import { isDatabaseMode, pool } from "./db";

export async function isSupervisor(userId: string): Promise<boolean> {
  if (!isDatabaseMode()) return false;
  const { rows } = await pool().query("select 1 from genie_supervisors where user_id = $1", [userId]);
  return rows.length > 0;
}

export type StudentRow = {
  id: string;
  /** The account name; the page prefers a name the student set in Settings. */
  name: string | null;
  email: string;
  completeLessons: number;
  /** The latest saved progress or work, or null when the student has not started. */
  lastActive: string | null;
};

/** Every account that is not a supervisor, by name. */
export async function listStudents(): Promise<StudentRow[]> {
  if (!isDatabaseMode()) return [];
  const { rows } = await pool().query<{ id: string; name: string | null; email: string; complete: number; last_active: Date | null }>(
    `select u.id, u.name, u.email,
       (select count(*) from genie_lesson_progress p where p.intern_id = u.id and p.data->>'status' = 'complete')::int as complete,
       greatest(
         (select max(p.updated_at) from genie_lesson_progress p where p.intern_id = u.id),
         (select w.updated_at from genie_work w where w.intern_id = u.id)
       ) as last_active
     from "user" u
     where not exists (select 1 from genie_supervisors s where s.user_id = u.id)
     order by lower(coalesce(nullif(u.name, ''), u.email))`,
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name?.trim() || null,
    email: r.email,
    completeLessons: r.complete,
    lastActive: r.last_active ? r.last_active.toISOString() : null,
  }));
}

/** One student, or null when the ID is not a student's account. */
export async function getStudent(id: string): Promise<{ id: string; name: string | null; email: string } | null> {
  if (!isDatabaseMode()) return null;
  const { rows } = await pool().query<{ id: string; name: string | null; email: string }>(
    `select u.id, u.name, u.email from "user" u
     where u.id = $1 and not exists (select 1 from genie_supervisors s where s.user_id = u.id)`,
    [id],
  );
  const r = rows[0];
  return r ? { id: r.id, name: r.name?.trim() || null, email: r.email } : null;
}
