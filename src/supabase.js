import { createClient } from "@supabase/supabase-js";

const appURL = import.meta.env.VITE_APP_URL;
const anonKey = import.meta.env.VITE_ANON_KEY;

export const supabase = createClient(appURL, anonKey);
