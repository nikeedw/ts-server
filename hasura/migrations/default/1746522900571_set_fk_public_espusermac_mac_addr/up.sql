alter table "public"."espusermac"
  add constraint "espusermac_mac_addr_fkey"
  foreign key ("mac_addr")
  references "public"."espmac"
  ("mac_addr") on update cascade on delete cascade;
