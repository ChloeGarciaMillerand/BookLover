alter table "public"."book" drop constraint "book_genre_id_fkey";

alter table "public"."booklist" drop constraint "booklist_book_id_fkey";

alter table "public"."booklist" drop constraint "booklist_list_id_fkey";

alter table "public"."list" drop constraint "list_organization_id_fkey";

alter table "public"."book" add constraint "book_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genre(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."book" validate constraint "book_genre_id_fkey";

alter table "public"."booklist" add constraint "booklist_book_id_fkey" FOREIGN KEY (book_id) REFERENCES public.book(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booklist" validate constraint "booklist_book_id_fkey";

alter table "public"."booklist" add constraint "booklist_list_id_fkey" FOREIGN KEY (list_id) REFERENCES public.list(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booklist" validate constraint "booklist_list_id_fkey";

alter table "public"."list" add constraint "list_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."list" validate constraint "list_organization_id_fkey";


