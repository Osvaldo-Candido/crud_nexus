import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njuvjcnaziyszztgopbg.supabase.co';
const supabaseAnonkei =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdXZqY25heml5c3p6dGdvcGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzODM2OTUsImV4cCI6MjA0Mzk1OTY5NX0.IuRY6A9NSJpfwt9z3s61XOlN5pydvhzdXXjjYBvlJs0';

export const supabase = createClient(supabaseUrl, supabaseAnonkei);
