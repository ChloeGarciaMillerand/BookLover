alter table "public"."book" enable row level security;

alter table "public"."booklist" enable row level security;

alter table "public"."genre" enable row level security;

alter table "public"."list" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_book(title_input text, list_id_input uuid, genre_id_input uuid DEFAULT NULL::uuid, author_input text DEFAULT NULL::text, editor_input text DEFAULT NULL::text, library_code_input text DEFAULT NULL::text, comment_input text DEFAULT NULL::text, isbn_input text DEFAULT NULL::text)
 RETURNS SETOF public.book
 LANGUAGE plpgsql
AS $function$
  declare new_book book;
  begin
    -- create book
    insert into book(
      title,
      genre_id,
      author,
      editor,
      library_code,
      comment,
      "ISBN")
    values (
      title_input,
      genre_id_input,
      author_input,
      editor_input,
      library_code_input,
      comment_input,
      isbn_input
    )
    returning * into new_book;
    -- link book to list
    insert into booklist(book_id, list_id)
    values(new_book.id, list_id_input);
    return next new_book;
  end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_books()
 RETURNS SETOF public.book
 LANGUAGE sql
AS $function$
  select * from book;
$function$
;

CREATE OR REPLACE FUNCTION public.get_organizations()
 RETURNS SETOF public.organization
 LANGUAGE sql
AS $function$
  select * from organization;
$function$
;

CREATE OR REPLACE FUNCTION public.get_users()
 RETURNS SETOF public.organization
 LANGUAGE sql
AS $function$
  select * from organization;
$function$
;

CREATE OR REPLACE FUNCTION public.hello()
 RETURNS text
 LANGUAGE sql
AS $function$
  select 'hello world';
$function$
;


  create policy "Enable delete for book owners"
  on "public"."book"
  as permissive
  for delete
  to authenticated
using ((id IN ( SELECT booklist.book_id
   FROM (public.booklist
     JOIN public.list ON ((booklist.list_id = list.id)))
  WHERE (list.user_id = auth.uid()))));



  create policy "Enable insert for authenticated users only"
  on "public"."book"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for book owner"
  on "public"."book"
  as permissive
  for select
  to authenticated
using (((id IN ( SELECT booklist.book_id
   FROM (public.booklist
     JOIN public.list ON ((booklist.list_id = list.id)))
  WHERE (list.user_id = auth.uid()))) OR (NOT (EXISTS ( SELECT 1
   FROM public.booklist
  WHERE (booklist.book_id = book.id))))));



  create policy "Enable update for book owner"
  on "public"."book"
  as permissive
  for update
  to authenticated
using ((id IN ( SELECT booklist.book_id
   FROM (public.booklist
     JOIN public.list ON ((booklist.list_id = list.id)))
  WHERE (list.user_id = auth.uid()))))
with check ((id IN ( SELECT booklist.book_id
   FROM (public.booklist
     JOIN public.list ON ((booklist.list_id = list.id)))
  WHERE (list.user_id = auth.uid()))));



  create policy "Enable delete list for list owners"
  on "public"."booklist"
  as permissive
  for delete
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.list
  WHERE ((list.id = booklist.list_id) AND (list.user_id = auth.uid())))));



  create policy "Enable insert booklist for list owners"
  on "public"."booklist"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM public.list
  WHERE ((list.id = booklist.list_id) AND (list.user_id = auth.uid())))));



  create policy "Enable read access for list owners"
  on "public"."booklist"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.list
  WHERE ((list.id = booklist.list_id) AND (list.user_id = auth.uid())))));



  create policy "Enable update for list owners"
  on "public"."booklist"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.list
  WHERE ((list.id = booklist.list_id) AND (list.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.list
  WHERE ((list.id = booklist.list_id) AND (list.user_id = auth.uid())))));



  create policy "Enable insert for authenticated users only"
  on "public"."genre"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable select for authenticated users only"
  on "public"."genre"
  as permissive
  for select
  to authenticated
using (((( SELECT auth.uid() AS uid) = user_id) OR (user_id IS NULL)));



  create policy "Enable delete for list owners"
  on "public"."list"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable insert for authenticated users only"
  on "public"."list"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable read access for list owners"
  on "public"."list"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable update for list owners"
  on "public"."list"
  as permissive
  for update
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


drop trigger if exists "protect_buckets_delete" on "storage"."buckets";

drop trigger if exists "protect_objects_delete" on "storage"."objects";

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


