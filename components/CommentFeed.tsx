import { Post } from "@/utils/types/my-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactTimeago from "react-timeago";

const CommentFeed = ({ post, user }: { post: Post; user: any }) => {
    return (
        <div className={"mt-3 space-y-2"}>
            {post.comments.map((comment) => {
                const profile_name = comment.profile.full_name.split(" ");
                return (
                    <div key={comment.id} className={"flex space-x-1"}>
                        <Avatar>
                            <AvatarImage
                                src={comment.profile.avatar_url}
                                referrerPolicy={"no-referrer"}
                            />
                            <AvatarFallback>
                                {profile_name[0].charAt(0)}
                                {profile_name[1]?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            className={
                                "w-full rounded-md bg-gray-100 px-4 py-2 sm:w-auto md:min-w-[300px]"
                            }>
                            <div className={"flex justify-between"}>
                                <div>
                                    <p className={"font-semibold"}>{comment.profile.full_name}</p>
                                    <p className={"text-xs text-gray-400"}>
                                        @{comment.profile.email}
                                    </p>
                                </div>
                                <p className={"text-xs text-gray-400"}>
                                    <ReactTimeago
                                        date={new Date(comment.created_at)}
                                        suppressHydrationWarning
                                    />
                                </p>
                            </div>
                            <p className={"mt-3 text-sm"}>{comment.text}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentFeed;
