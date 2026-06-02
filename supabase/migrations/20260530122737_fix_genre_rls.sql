
  ALTER policy "Enable insert for authenticated users only"
  on "public"."genre"
  to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));