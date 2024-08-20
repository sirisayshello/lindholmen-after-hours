export const config = {
  supabase: {
    anon: process.env.NEXT_PUBLIC_ANON ?? "",
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  },
};
