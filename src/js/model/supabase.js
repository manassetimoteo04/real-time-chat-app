import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hawergecailcjzbxlfuy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd2VyZ2VjYWlsY2p6YnhsZnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5OTA5NjksImV4cCI6MjAzNjU2Njk2OX0.oAB2RoxaKTP2x2sqfDuRXUJ9nRJZ2a06M8MKLxKkUR4";
export const supabase = createClient(supabaseUrl, supabaseKey);
