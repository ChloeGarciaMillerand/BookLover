
  create table "public"."book" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "author" text,
    "editor" text,
    "library_code" text,
    "comment" text,
    "ISBN" text,
    "created_at" timestamp with time zone not null default now(),
    "genre_id" uuid
      );



  create table "public"."booklist" (
    "id" uuid not null default gen_random_uuid(),
    "book_id" uuid,
    "list_id" uuid,
    "created_at" timestamp with time zone not null default now()
      );



  create table "public"."genre" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "color" text not null,
    "created_at" timestamp with time zone not null default now()
      );



  create table "public"."list" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
      );


CREATE UNIQUE INDEX book_pkey ON public.book USING btree (id);

CREATE UNIQUE INDEX booklist_pkey ON public.booklist USING btree (id);

CREATE UNIQUE INDEX genre_pkey ON public.genre USING btree (id);

CREATE UNIQUE INDEX list_pkey ON public.list USING btree (id);

alter table "public"."book" add constraint "book_pkey" PRIMARY KEY using index "book_pkey";

alter table "public"."booklist" add constraint "booklist_pkey" PRIMARY KEY using index "booklist_pkey";

alter table "public"."genre" add constraint "genre_pkey" PRIMARY KEY using index "genre_pkey";

alter table "public"."list" add constraint "list_pkey" PRIMARY KEY using index "list_pkey";

alter table "public"."book" add constraint "book_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genre(id) not valid;

alter table "public"."book" validate constraint "book_genre_id_fkey";

alter table "public"."booklist" add constraint "booklist_book_id_fkey" FOREIGN KEY (book_id) REFERENCES public.book(id) not valid;

alter table "public"."booklist" validate constraint "booklist_book_id_fkey";

alter table "public"."booklist" add constraint "booklist_list_id_fkey" FOREIGN KEY (list_id) REFERENCES public.list(id) not valid;

alter table "public"."booklist" validate constraint "booklist_list_id_fkey";

grant delete on table "public"."book" to "anon";

grant insert on table "public"."book" to "anon";

grant references on table "public"."book" to "anon";

grant select on table "public"."book" to "anon";

grant trigger on table "public"."book" to "anon";

grant truncate on table "public"."book" to "anon";

grant update on table "public"."book" to "anon";

grant delete on table "public"."book" to "authenticated";

grant insert on table "public"."book" to "authenticated";

grant references on table "public"."book" to "authenticated";

grant select on table "public"."book" to "authenticated";

grant trigger on table "public"."book" to "authenticated";

grant truncate on table "public"."book" to "authenticated";

grant update on table "public"."book" to "authenticated";

grant delete on table "public"."book" to "postgres";

grant insert on table "public"."book" to "postgres";

grant references on table "public"."book" to "postgres";

grant select on table "public"."book" to "postgres";

grant trigger on table "public"."book" to "postgres";

grant truncate on table "public"."book" to "postgres";

grant update on table "public"."book" to "postgres";

grant delete on table "public"."book" to "service_role";

grant insert on table "public"."book" to "service_role";

grant references on table "public"."book" to "service_role";

grant select on table "public"."book" to "service_role";

grant trigger on table "public"."book" to "service_role";

grant truncate on table "public"."book" to "service_role";

grant update on table "public"."book" to "service_role";

grant delete on table "public"."booklist" to "anon";

grant insert on table "public"."booklist" to "anon";

grant references on table "public"."booklist" to "anon";

grant select on table "public"."booklist" to "anon";

grant trigger on table "public"."booklist" to "anon";

grant truncate on table "public"."booklist" to "anon";

grant update on table "public"."booklist" to "anon";

grant delete on table "public"."booklist" to "authenticated";

grant insert on table "public"."booklist" to "authenticated";

grant references on table "public"."booklist" to "authenticated";

grant select on table "public"."booklist" to "authenticated";

grant trigger on table "public"."booklist" to "authenticated";

grant truncate on table "public"."booklist" to "authenticated";

grant update on table "public"."booklist" to "authenticated";

grant delete on table "public"."booklist" to "postgres";

grant insert on table "public"."booklist" to "postgres";

grant references on table "public"."booklist" to "postgres";

grant select on table "public"."booklist" to "postgres";

grant trigger on table "public"."booklist" to "postgres";

grant truncate on table "public"."booklist" to "postgres";

grant update on table "public"."booklist" to "postgres";

grant delete on table "public"."booklist" to "service_role";

grant insert on table "public"."booklist" to "service_role";

grant references on table "public"."booklist" to "service_role";

grant select on table "public"."booklist" to "service_role";

grant trigger on table "public"."booklist" to "service_role";

grant truncate on table "public"."booklist" to "service_role";

grant update on table "public"."booklist" to "service_role";

grant delete on table "public"."genre" to "anon";

grant insert on table "public"."genre" to "anon";

grant references on table "public"."genre" to "anon";

grant select on table "public"."genre" to "anon";

grant trigger on table "public"."genre" to "anon";

grant truncate on table "public"."genre" to "anon";

grant update on table "public"."genre" to "anon";

grant delete on table "public"."genre" to "authenticated";

grant insert on table "public"."genre" to "authenticated";

grant references on table "public"."genre" to "authenticated";

grant select on table "public"."genre" to "authenticated";

grant trigger on table "public"."genre" to "authenticated";

grant truncate on table "public"."genre" to "authenticated";

grant update on table "public"."genre" to "authenticated";

grant delete on table "public"."genre" to "postgres";

grant insert on table "public"."genre" to "postgres";

grant references on table "public"."genre" to "postgres";

grant select on table "public"."genre" to "postgres";

grant trigger on table "public"."genre" to "postgres";

grant truncate on table "public"."genre" to "postgres";

grant update on table "public"."genre" to "postgres";

grant delete on table "public"."genre" to "service_role";

grant insert on table "public"."genre" to "service_role";

grant references on table "public"."genre" to "service_role";

grant select on table "public"."genre" to "service_role";

grant trigger on table "public"."genre" to "service_role";

grant truncate on table "public"."genre" to "service_role";

grant update on table "public"."genre" to "service_role";

grant delete on table "public"."list" to "anon";

grant insert on table "public"."list" to "anon";

grant references on table "public"."list" to "anon";

grant select on table "public"."list" to "anon";

grant trigger on table "public"."list" to "anon";

grant truncate on table "public"."list" to "anon";

grant update on table "public"."list" to "anon";

grant delete on table "public"."list" to "authenticated";

grant insert on table "public"."list" to "authenticated";

grant references on table "public"."list" to "authenticated";

grant select on table "public"."list" to "authenticated";

grant trigger on table "public"."list" to "authenticated";

grant truncate on table "public"."list" to "authenticated";

grant update on table "public"."list" to "authenticated";

grant delete on table "public"."list" to "postgres";

grant insert on table "public"."list" to "postgres";

grant references on table "public"."list" to "postgres";

grant select on table "public"."list" to "postgres";

grant trigger on table "public"."list" to "postgres";

grant truncate on table "public"."list" to "postgres";

grant update on table "public"."list" to "postgres";

grant delete on table "public"."list" to "service_role";

grant insert on table "public"."list" to "service_role";

grant references on table "public"."list" to "service_role";

grant select on table "public"."list" to "service_role";

grant trigger on table "public"."list" to "service_role";

grant truncate on table "public"."list" to "service_role";

grant update on table "public"."list" to "service_role";



