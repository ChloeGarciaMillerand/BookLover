-- 1. delete books
delete from booklist
where list_id in (
  select id from list
  where user_id in (
    select id from auth.users where email = 'chloe@test.com'
  )
);

-- 2. delete lists
delete from list
where user_id in (
  select id from auth.users where email = 'chloe@test.com'
);

-- 3. delete user
delete from auth.users
where email = 'chloe@test.com';

