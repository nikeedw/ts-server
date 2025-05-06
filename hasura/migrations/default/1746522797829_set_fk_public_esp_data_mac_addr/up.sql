alter table "public"."esp_data"
  add constraint "esp_data_mac_addr_fkey"
  foreign key ("mac_addr")
  references "public"."espmac"
  ("mac_addr") on update restrict on delete cascade;
