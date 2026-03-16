
  create table "public"."genre_templates" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "color" text not null
      );


alter table "public"."genre_templates" enable row level security;

CREATE UNIQUE INDEX genre_templates_pkey ON public.genre_templates USING btree (id);

alter table "public"."genre_templates" add constraint "genre_templates_pkey" PRIMARY KEY using index "genre_templates_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.copy_genre_templates_to_user()
 RETURNS trigger
 LANGUAGE plpgsql
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

grant insert on table "public"."genre" to "supabase_auth_admin";

grant delete on table "public"."genre_templates" to "anon";

grant insert on table "public"."genre_templates" to "anon";

grant references on table "public"."genre_templates" to "anon";

grant select on table "public"."genre_templates" to "anon";

grant trigger on table "public"."genre_templates" to "anon";

grant truncate on table "public"."genre_templates" to "anon";

grant update on table "public"."genre_templates" to "anon";

grant delete on table "public"."genre_templates" to "authenticated";

grant insert on table "public"."genre_templates" to "authenticated";

grant references on table "public"."genre_templates" to "authenticated";

grant select on table "public"."genre_templates" to "authenticated";

grant trigger on table "public"."genre_templates" to "authenticated";

grant truncate on table "public"."genre_templates" to "authenticated";

grant update on table "public"."genre_templates" to "authenticated";

grant delete on table "public"."genre_templates" to "service_role";

grant insert on table "public"."genre_templates" to "service_role";

grant references on table "public"."genre_templates" to "service_role";

grant select on table "public"."genre_templates" to "service_role";

grant trigger on table "public"."genre_templates" to "service_role";

grant truncate on table "public"."genre_templates" to "service_role";

grant update on table "public"."genre_templates" to "service_role";


  create policy "Allow insert from auth trigger"
  on "public"."genre"
  as permissive
  for insert
  to supabase_auth_admin
with check (true);



  create policy "Enable delete genre for users"
  on "public"."genre"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = user_id));



  create policy "Enable update genre for user"
  on "public"."genre"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can read genre templates"
  on "public"."genre_templates"
  as permissive
  for select
  to authenticated
using (true);


CREATE TRIGGER on_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.copy_genre_templates_to_user();


