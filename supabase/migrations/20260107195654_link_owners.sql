alter table "public"."genre" add column "user_id" uuid;

alter table "public"."list" add column "user_id" uuid not null default auth.uid();

alter table "public"."genre" add constraint "genre_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."genre" validate constraint "genre_user_id_fkey";

alter table "public"."list" add constraint "list_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."list" validate constraint "list_user_id_fkey";


