alter table "public"."espusermac"
  add constraint "espusermac_username_fkey"
  foreign key ("username")
  references "public"."users"
  ("username") on update cascade on delete cascade;
