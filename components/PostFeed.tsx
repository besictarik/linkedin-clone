import { Tables } from "@/utils/types/supabase-types";
import Post from "@/components/Post";
import { type Post as PostType } from "@/utils/types/my-types";

const PostFeed = ({ posts, user }: { posts: PostType[] | null; user: any }) => {
    return (
        <div className={"space-y-2 pb-20"}>
            {posts?.map((post) => <Post key={post.id} post={post} user={user} />)}
        </div>
    );
};

export default PostFeed;
