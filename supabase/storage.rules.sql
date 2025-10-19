-- Storage bucket policies
-- Public bucket: anyone can read, only admin can write

-- Create public bucket if it doesn't exist
insert into storage.buckets (id, name, public) values ('public', 'public', true) on conflict (id) do nothing;

-- Public read policy for all files
create policy "Public read access" on storage.objects
  for select using (bucket_id = 'public');

-- Admin write policy for all folders
create policy "Admin write access" on storage.objects
  for insert with check (
    bucket_id = 'public' and 
    exists(select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admin update access" on storage.objects
  for update using (
    bucket_id = 'public' and 
    exists(select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admin delete access" on storage.objects
  for delete using (
    bucket_id = 'public' and 
    exists(select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );


