
  create table "public"."organization" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."list" add column "organization_id" uuid;

CREATE UNIQUE INDEX organization_pkey ON public.organization USING btree (id);

alter table "public"."organization" add constraint "organization_pkey" PRIMARY KEY using index "organization_pkey";

alter table "public"."list" add constraint "list_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES public.organization(id) not valid;

alter table "public"."list" validate constraint "list_organization_id_fkey";

grant delete on table "public"."book" to "postgres";

grant insert on table "public"."book" to "postgres";

grant references on table "public"."book" to "postgres";

grant select on table "public"."book" to "postgres";

grant trigger on table "public"."book" to "postgres";

grant truncate on table "public"."book" to "postgres";

grant update on table "public"."book" to "postgres";

grant delete on table "public"."booklist" to "postgres";

grant insert on table "public"."booklist" to "postgres";

grant references on table "public"."booklist" to "postgres";

grant select on table "public"."booklist" to "postgres";

grant trigger on table "public"."booklist" to "postgres";

grant truncate on table "public"."booklist" to "postgres";

grant update on table "public"."booklist" to "postgres";

grant delete on table "public"."genre" to "postgres";

grant insert on table "public"."genre" to "postgres";

grant references on table "public"."genre" to "postgres";

grant select on table "public"."genre" to "postgres";

grant trigger on table "public"."genre" to "postgres";

grant truncate on table "public"."genre" to "postgres";

grant update on table "public"."genre" to "postgres";

grant delete on table "public"."list" to "postgres";

grant insert on table "public"."list" to "postgres";

grant references on table "public"."list" to "postgres";

grant select on table "public"."list" to "postgres";

grant trigger on table "public"."list" to "postgres";

grant truncate on table "public"."list" to "postgres";

grant update on table "public"."list" to "postgres";

grant delete on table "public"."organization" to "anon";

grant insert on table "public"."organization" to "anon";

grant references on table "public"."organization" to "anon";

grant select on table "public"."organization" to "anon";

grant trigger on table "public"."organization" to "anon";

grant truncate on table "public"."organization" to "anon";

grant update on table "public"."organization" to "anon";

grant delete on table "public"."organization" to "authenticated";

grant insert on table "public"."organization" to "authenticated";

grant references on table "public"."organization" to "authenticated";

grant select on table "public"."organization" to "authenticated";

grant trigger on table "public"."organization" to "authenticated";

grant truncate on table "public"."organization" to "authenticated";

grant update on table "public"."organization" to "authenticated";

grant delete on table "public"."organization" to "postgres";

grant insert on table "public"."organization" to "postgres";

grant references on table "public"."organization" to "postgres";

grant select on table "public"."organization" to "postgres";

grant trigger on table "public"."organization" to "postgres";

grant truncate on table "public"."organization" to "postgres";

grant update on table "public"."organization" to "postgres";

grant delete on table "public"."organization" to "service_role";

grant insert on table "public"."organization" to "service_role";

grant references on table "public"."organization" to "service_role";

grant select on table "public"."organization" to "service_role";

grant trigger on table "public"."organization" to "service_role";

grant truncate on table "public"."organization" to "service_role";

grant update on table "public"."organization" to "service_role";



