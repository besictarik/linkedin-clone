import { useEffect, useRef, useState } from "react";
import { type Post } from "@/utils/types/my-types";
import { Button } from "@/components/ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { likePost, unlikePost } from "@/utils/actions/post";
import { useDebouncedCallback } from "use-debounce";
import CommentFeed from "@/components/CommentFeed";
import CommentForm from "@/components/CommentForm";

const PostOptions = ({ post, user }: { post: Post; user: any }) => {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const db_isLiked_state = useRef(false);

    useEffect(() => {
        if (user?.id && post.likes.find((like) => like.profile_id == user.id) !== undefined) {
            db_isLiked_state.current = true;
            setIsLiked(true);
        }
    }, [post, user]);

    const likeOrUnlikePost = async () => {
        if (!user) return { error: "User not authenticated." };

        if (isLiked) {
            setLikes((likes) => likes - 1);
        } else {
            setLikes((likes) => likes + 1);
        }
        handleLikeOrUnlikeAction();

        setIsLiked((isLiked) => !isLiked);
    };

    const handleLikeOrUnlikeAction = useDebouncedCallback(() => {
        if (isLiked == db_isLiked_state.current) return;
        isLiked ? likePost(post.id) : unlikePost(post.id);
        db_isLiked_state.current = isLiked;
    }, 500);

    return (
        <div>
            <div className={"flex justify-between p-4"}>
                <div>
                    {likes ? (
                        <p className={"cursor-pointer text-xs text-gray-500 hover:underline"}>
                            {likes} likes
                        </p>
                    ) : null}
                </div>
                <div>
                    {post.comments && (
                        <p
                            onClick={() => setIsCommentsOpen((isCommentsOpen) => !isCommentsOpen)}
                            className={"cursor-pointer text-xs text-gray-500 hover:underline"}>
                            {post.comments.length} comments
                        </p>
                    )}
                </div>
            </div>
            <div className={"flex justify-between border-t p-2 px-2"}>
                <Button
                    variant={"ghost"}
                    className={"postButton"}
                    onClick={() => likeOrUnlikePost()}>
                    <ThumbsUpIcon
                        className={cn("mr-1", isLiked && "fill-[#4881c2] text-[#4881c2]")}
                    />
                    <span className={"hidden sm:block"}>Like</span>
                </Button>
                <Button
                    variant={"ghost"}
                    className={"postButton"}
                    onClick={() => setIsCommentsOpen((isCommentsOpen) => !isCommentsOpen)}>
                    <MessageCircle
                        className={cn("mr-1", isCommentsOpen && "fill-gray-600 text-gray-600")}
                    />
                    <span className={"hidden sm:block"}>Comment</span>
                </Button>
                <Button variant={"ghost"} className={"postButton"}>
                    <Repeat2 className={"mr-1"} />
                    <span className={"hidden sm:block"}>Repost</span>
                </Button>
                <Button variant={"ghost"} className={"postButton"}>
                    <Send className={"mr-1"} />
                    <span className={"hidden sm:block"}>Send</span>
                </Button>
            </div>
            {isCommentsOpen && (
                <div className={"p-4"}>
                    {user && <CommentForm postId={post.id} user={user} />}
                    <CommentFeed post={post} user={user} />
                </div>
            )}
        </div>
    );
};

export default PostOptions;
