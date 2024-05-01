import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createComment } from "@/utils/actions/post";
import { toast } from "sonner";

const CommentForm = ({ postId, user }: { postId: string; user: any }) => {
    const ref = useRef<HTMLFormElement>(null);
    const full_name = user.user_metadata.full_name.split(" ");

    const createCommentWithPostId = createComment.bind(null, postId);

    const handleCommentAction = async (formData: FormData) => {
        const formDataCopy = formData;
        const text = formDataCopy.get("commentInput") as string;
        if (!text.trim()) throw Error;
        ref.current?.reset();

        await createCommentWithPostId(formDataCopy);
    };

    return (
        <form
            ref={ref}
            action={(formData) => {
                const promise = handleCommentAction(formData);
                toast.promise(promise, {
                    loading: "Creating comment...",
                    success: "Comment created",
                    error: "Failed to create comment",
                });
            }}
            className={"flex items-center space-x-1"}>
            <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} referrerPolicy={"no-referrer"} />
                <AvatarFallback>
                    {full_name?.[0].charAt(0).toUpperCase()}
                    {full_name?.[1]?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className={"flex flex-1 rounded-full border bg-white px-3 py-2"}>
                <input
                    type='text'
                    name={"commentInput"}
                    placeholder={"Add a comment..."}
                    className={"flex-1 bg-transparent text-sm outline-none"}
                />
                <button type={"submit"} hidden>
                    Post
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
