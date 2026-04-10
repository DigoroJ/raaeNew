import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dmoyeecnlwzbecgzcwlh.supabase.co"
const supabaseKey = "sb_publishable_EJLxYZkbnitIApo9OCC6PA_QOf4C9_4"

export const supabase = createClient(supabaseUrl, supabaseKey)