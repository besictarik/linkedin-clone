"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePost } from "@/utils/actions/post";
import Image from "next/image";
import { getImageURL } from "@/utils/helpers/post";
import PostOptions from "@/components/PostOptions";
import { type Post as PostType } from "@/utils/types/my-types";
import { toast } from "sonner";

const Post = ({ post, user }: { post: PostType; user: any }) => {
    const isAuthor = user?.id === post.profile.id;
    const profile_name = post.profile.full_name.split(" ");

    return (
        <div className={"rounded-md border bg-white"}>
            <div className={"flex space-x-2 p-4"}>
                <div>
                    <Avatar>
                        <AvatarImage
                            src={post.profile.avatar_url}
                            alt={"User Profile Photo"}
                            referrerPolicy={"no-referrer"}
                        />
                        <AvatarFallback>
                            {profile_name[0].charAt(0)}
                            {profile_name[1]?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className={"flex flex-1 justify-between"}>
                    <div>
                        <div className={"flex"}>
                            <p className={"font-semibold"}>{post.profile.full_name}</p>
                            {isAuthor && (
                                <Badge className={"ml-2"} variant={"secondary"}>
                                    Author
                                </Badge>
                            )}
                        </div>
                        <p className={"text-xs text-gray-400"}>@{post.profile.email}</p>
                        <p className={"text-xs text-gray-400"}>
                            <ReactTimeago
                                date={new Date(post.created_at)}
                                suppressHydrationWarning
                            />
                        </p>
                    </div>
                    {isAuthor && (
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                const promise = deletePost(post.id);
                                toast.promise(promise, {
                                    loading: "Deleting post...",
                                    success: "Post deleted",
                                    error: "Failed to delete post",
                                });
                            }}>
                            <Trash2 />
                        </Button>
                    )}
                </div>
            </div>
            <div className={"mt-2 px-4 pb-2"}>
                <p>{post.text}</p>
                {post.image && (
                    <Image
                        src={getImageURL(post.image)}
                        alt={"Post Image"}
                        width={500}
                        height={500}
                        className={"mx-auto w-full"}
                    />
                )}
            </div>
            {/* Post Options */}
            <PostOptions post={post} user={user} />
        </div>
    );
};

export default Post;
