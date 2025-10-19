-- Add brand field to models table
alter table if exists models
  add column if not exists brand text;
