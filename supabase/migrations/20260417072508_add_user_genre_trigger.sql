-- function
CREATE OR REPLACE FUNCTION public.copy_genre_templates_to_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.genre (name, color, user_id)
    SELECT name, color, NEW.id
    FROM public.genre_templates;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

-- trigger
CREATE OR REPLACE TRIGGER on_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
execute procedure public.copy_genre_templates_to_user();

-- grant permissions to the trigger function for the supabase_auth_admin role
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT INSERT ON TABLE public.genre TO supabase_auth_admin;