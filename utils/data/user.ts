import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { type UserStats } from "@/utils/types/my-types";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getUser = cache(() => {
    const supabase = createClient();
    return supabase.auth.getUser();
});

export const getUserStats = async (): Promise<{
    data?: UserStats;
    error?: PostgrestError | string;
}> => {
    const supabase = createClient();
    const {
        data: { user },
        error: authError,
    } = await getUser();

    if (!user) return { error: "User not authenticated." };

    const { data, error } = await supabase
        .from("profiles")
        .select("comments(count), posts!posts_profile_id_fkey(count)")
        .eq("id", user.id)
        .single();

    if (error) return { error: error };

    const user_stats = {
        posts_count: data.posts[0].count as number,
        comments_count: data.comments[0].count as number,
    };

    return { data: user_stats };
};
