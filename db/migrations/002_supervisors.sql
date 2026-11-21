-- Supervisors: accounts that can see every student's progress and submitted work (read-only).
-- Everyone not listed here is a student. Granted with: npm run create-intern -- --supervisor
create table if not exists genie_supervisors (
  user_id    text primary key references "user"(id) on delete cascade,
  created_at timestamptz not null default now()
);
