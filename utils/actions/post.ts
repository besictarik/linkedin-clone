"use server";

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "node:crypto";
import { type Tables, type TablesInsert } from "@/utils/types/supabase-types";
import { revalidatePath } from "next/cache";
import { type PostgrestError } from "@supabase/supabase-js";

export const createPost = async (formData: FormData) => {
    const supabase = createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (!user || authError) return { error: "User is not logged in." };

    const text = formData.get("postInput") as string;
    const image = formData.get("image") as File;

    // If Post does not include an image
    if (!image?.size) {
        const { error } = await supabase
            .from("posts")
            .insert<TablesInsert<"posts">>({ text: text });
        if (error) return { error };
        return revalidatePath("/");
    }

    // If there is image in a Post
    // Uploading it to a Supabase storage
    const timestamp = new Date().getTime();
    const file_name = `${randomUUID()}_${timestamp}.png`;
    const { data, error: storageError } = await supabase.storage
        .from("post_images")
        .upload(file_name, image, {
            cacheControl: "3600",
            upsert: false,
        });

    if (storageError) return { error: storageError };

    // If no error occurred, we are creating a post with its both text and image
    const { error } = await supabase
        .from("posts")
        .insert<TablesInsert<"posts">>({ text: text, image: data?.path });

    if (error) return error;
    revalidatePath("/");
};

export const deletePost = async (postId: string) => {
    const supabase = createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (!user || authError) return { error: "User is not logged in." };

    // Check if user is the post creator
    const { data: post, error }: { data: Tables<"posts"> | null; error: PostgrestError | null } =
        await supabase.from("posts").select().eq("id", postId).single();

    if (!post) return { error: "Post does not exist." };
    if (post.profile_id != user.id) return { error: "Only the creator of the post can delete it." };

    // Deleting image if post had any
    if (post.image) {
        const { data, error: storageError } = await supabase.storage
            .from("post_images")
            .remove([post.image]);
        if (error) return { error };
    }

    const { error: deletionError } = await supabase.from("posts").delete().eq("id", postId);

    if (deletionError) return { error: deletionError };

    revalidatePath("/");
};

export const likePost = async (postId: string) => {
    const supabase = createClient();

    const { error } = await supabase
        .from("posts_likes")
        .insert<TablesInsert<"posts_likes">>({ post_id: postId });

    if (error) return { error };
    revalidatePath("/");
};

export const unlikePost = async (postId: string) => {
    const supabase = createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (!user) return { error: "User not authenticated." };

    const { error } = await supabase
        .from("posts_likes")
        .delete()
        .eq("post_id", postId)
        .eq("profile_id", user.id);

    if (error) return { error };
    revalidatePath("/");
};

export const createComment = async (postId: string, formData: FormData) => {
    const supabase = createClient();
    const { data: user, error: authError } = await supabase.auth.getUser();
    if (!user) return { error: "User not authenticated." };

    const text = formData.get("commentInput") as string;

    const { error } = await supabase
        .from("comments")
        .insert<TablesInsert<"comments">>({ post_id: postId, text: text });

    if (error) return { error };

    revalidatePath("/");
};
