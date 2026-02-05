-- Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- Create Epics table
create table if not exists public.epics (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text check (status in ('planned', 'in-progress', 'completed')) default 'planned',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Sprints table
create table if not exists public.sprints (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  start_date date not null,
  end_date date not null,
  status text check (status in ('planned', 'active', 'completed')) default 'planned',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Tasks table
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  epic_id uuid references public.epics(id) on delete set null,
  sprint_id uuid references public.sprints(id) on delete set null,
  title text not null,
  description text,
  status text check (status in ('todo', 'in-progress', 'review', 'done')) default 'todo',
  priority text check (priority in ('low', 'medium', 'high', 'critical')) default 'medium',
  vector_context vector(1536), -- Assuming OpenAI embeddings, can be adjusted
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Task Relations table (Blockers, Duplicates, Relates to)
create table if not exists public.task_relations (
  id uuid default gen_random_uuid() primary key,
  source_task_id uuid references public.tasks(id) on delete cascade,
  target_task_id uuid references public.tasks(id) on delete cascade,
  relation_type text check (relation_type in ('blocks', 'duplicates', 'relates_to')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.epics enable row level security;
alter table public.sprints enable row level security;
alter table public.tasks enable row level security;
alter table public.task_relations enable row level security;

-- Simple Authenticated Access Policy (Using DO block to avoid errors if policy exists)
do $$ 
begin
  if not exists (select 1 from pg_policies where policyname = 'Allow all actions for authenticated users' and tablename = 'tasks') then
    create policy "Allow all actions for authenticated users" on public.tasks for all using (auth.role() = 'authenticated');
  end if;
  
  if not exists (select 1 from pg_policies where policyname = 'Allow all actions for authenticated users' and tablename = 'epics') then
    create policy "Allow all actions for authenticated users" on public.epics for all using (auth.role() = 'authenticated');
  end if;

  if not exists (select 1 from pg_policies where policyname = 'Allow all actions for authenticated users' and tablename = 'sprints') then
    create policy "Allow all actions for authenticated users" on public.sprints for all using (auth.role() = 'authenticated');
  end if;

  if not exists (select 1 from pg_policies where policyname = 'Allow all actions for authenticated users' and tablename = 'task_relations') then
    create policy "Allow all actions for authenticated users" on public.task_relations for all using (auth.role() = 'authenticated');
  end if;
end $$;
