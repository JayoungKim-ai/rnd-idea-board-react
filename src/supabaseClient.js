import { createClient } from "@supabase/supabase-js";

// .env 파일에서 환경 변수를 읽어옵니다 (Vite는 VITE_ 접두사 필수)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Supabase 클라이언트를 생성하고 내보냅니다
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
