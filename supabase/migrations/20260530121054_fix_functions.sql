set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.copy_genre_templates_to_user()
 RETURNS trigger
 LANGUAGE plpgsql
 set search_path = ''
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.genre (name, color, user_id)
    SELECT name, color, NEW.id
    FROM public.genre_templates;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_book(title_input text, list_id_input uuid, genre_id_input uuid DEFAULT NULL::uuid, author_input text DEFAULT NULL::text, editor_input text DEFAULT NULL::text, library_code_input text DEFAULT NULL::text, comment_input text DEFAULT NULL::text, isbn_input text DEFAULT NULL::text)
 RETURNS SETOF public.book
 LANGUAGE plpgsql
 set search_path = ''
AS $function$
  declare new_book public.book;
  begin
    -- create book
    insert into public.book(
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
    insert into public.booklist(book_id, list_id)
    values(new_book.id, list_id_input);
    return next new_book;
  end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_books()
 RETURNS SETOF public.book
 LANGUAGE sql
 set search_path = ''
AS $function$
  select * from public.book;
$function$
;

CREATE OR REPLACE FUNCTION public.get_organizations()
 RETURNS SETOF public.organization
 LANGUAGE sql
 set search_path = ''
AS $function$
  select * from public.organization;
$function$
;

CREATE OR REPLACE FUNCTION public.get_users()
 RETURNS SETOF public.organization
 LANGUAGE sql
 set search_path = ''
AS $function$
  select * from public.organization;
$function$
;