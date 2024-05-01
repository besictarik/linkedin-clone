import { Tables } from "@/utils/types/supabase-types";

export type Post = {
    id: string;
    text: string;
    image?: string;
    created_at: string;
    profile: {
        id: string;
        full_name: string;
        email: string;
        avatar_url: string;
    };
    likes: { profile_id: string }[];
    comments: Comment[];
};

type Comment = {
    id: string;
    text: string;
    likes: { profile_id: string }[];
    profile: {
        id: string;
        full_name: string;
        email: string;
        avatar_url: string;
    };
    created_at: string;
};

export type UserStats = {
    posts_count: number;
    comments_count: number;
};
