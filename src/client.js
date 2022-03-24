import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qioeiarxviiwdmikapcy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb2VpYXJ4dmlpd2RtaWthcGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc3MDk3NzAsImV4cCI6MTk2MzI4NTc3MH0.KNpx0YPpAedeeDa3pPvLUL7s1x1lfPIlwkvzm5iGFSY"
);