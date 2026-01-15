create or replace function get_users() returns setof user as $$
  select * from user;
$$ language sql;