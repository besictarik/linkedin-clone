import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserStats } from "@/utils/data/user";
import { UserStats } from "@/utils/types/my-types";

const UserInformation = async ({ user }: { user: any }) => {
    const full_name = user?.user_metadata.full_name.split(" ");
    let user_stats: UserStats | null = null;
    if (user) {
        const { data } = await getUserStats();
        if (data) {
            user_stats = data;
        }
    }

    return (
        <div
            className={
                "mr-6 flex flex-col items-center justify-center rounded-lg border bg-white py-4"
            }>
            <Avatar>
                {user ? (
                    <AvatarImage
                        src={user.user_metadata.avatar_url}
                        alt={`User Profile Picture`}
                        referrerPolicy={"no-referrer"}
                    />
                ) : (
                    <AvatarImage
                        src={"https://avatars.githubusercontent.com/u/76400418?v=4"}
                        alt={"Profile Picture Placeholder"}
                    />
                )}
                <AvatarFallback>
                    {full_name?.[0].charAt(0).toUpperCase()}
                    {full_name?.[1]?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            {user ? (
                <div className={"text-center"}>
                    <p className={"font-semibold"}>{user.user_metadata.full_name}</p>
                    <p className={"text-xs"}>@{user.email}</p>
                </div>
            ) : (
                <div className={"space-y-2 text-center"}>
                    <p className={"font-semibold"}>You are not signed in</p>
                    <Button asChild className={"bg-[#0B63C4] text-white"}>
                        <Link href={"/signin"}>Sign in</Link>
                    </Button>
                </div>
            )}
            {user && (
                <>
                    <hr className={"my-5 w-full border-gray-200"} />
                    <div className={"flex w-full justify-between px-4 text-sm"}>
                        <p className={"font-semibold text-gray-400"}>Posts</p>
                        <p className={"text-blue-400"}>{user_stats?.posts_count}</p>
                    </div>
                    <div className={"flex w-full justify-between px-4 text-sm"}>
                        <p className={"font-semibold text-gray-400"}>Comments</p>
                        <p className={"text-blue-400"}>{user_stats?.comments_count}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserInformation;
