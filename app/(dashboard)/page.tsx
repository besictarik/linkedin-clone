import UserInformation from "@/components/UserInformation";
import PostForm from "@/components/PostForm";
import { createClient } from "@/utils/supabase/server";
import PostFeed from "@/components/PostFeed";
import { getPosts } from "@/utils/data/post";
import Widget from "@/components/Widget";
import { unstable_cache } from "next/cache";
import { getUser } from "@/utils/data/user";

// export const revalidate = 0;

const Home = async () => {
    const {
        data: { user },
        error: authError,
    } = await getUser();

    const { data: posts, error } = await getPosts();

    return (
        <div className={"mt-5 grid grid-cols-8 sm:px-5"}>
            <section className={"hidden md:col-span-2 md:inline"}>
                <UserInformation user={user} />
            </section>
            <section
                className={"col-span-full mx-auto w-full md:col-span-6 xl:col-span-4 xl:max-w-xl"}>
                {user && <PostForm user={user} />}
                {posts && <PostFeed posts={posts} user={user} />}
            </section>
            <section className={"col-span-2 hidden justify-center xl:inline"}>
                <Widget />
            </section>
        </div>
    );
};

export default Home;
