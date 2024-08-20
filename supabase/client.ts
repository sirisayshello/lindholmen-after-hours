import { createClient } from "@supabase/supabase-js";
import { config } from "@/config";

const SUPABASE_URL = config.supabase.url;
const SUPABASE_KEY = config.supabase.anon;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
