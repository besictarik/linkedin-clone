import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { type Post } from "@/utils/types/my-types";

export const getPosts = async (): Promise<{
    data?: Post[];
    error?: PostgrestError | string | null;
}> => {
    const supabase = createClient();

    // No need to check if the user is logged in
    // Everyone can see all the posts

    // @ts-ignore - random unexplainable ts error
    // It works when it's not beeing ordered by
    const {
        data: posts,
        error: postsError,
    }: { data: Post[] | null; error: PostgrestError | null } = await supabase
        .from("posts")
        .select(
            "id, text, image, created_at, profile:profiles(id, full_name, email, avatar_url), likes:posts_likes(profile_id), comments:comments(id, text, created_at, profile:profiles(id, full_name, email, avatar_url), likes:comments_likes(profile_id))"
        )
        .order("created_at", { ascending: false })
        .order("created_at", { referencedTable: "comments", ascending: false });

    if (posts == null) return { error: postsError };

    return { data: posts };
};
