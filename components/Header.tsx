import Image from "next/image";
import LinkedinLogoIcon from "@/public/lingedin-logo.png";
import { Briefcase, HomeIcon, MessagesSquare, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/utils/data/user";

const Header = async () => {
    const {
        data: { user },
        error,
    } = await getUser();
    const full_name = user?.user_metadata.full_name.split(" ");

    const signOut = async () => {
        "use server";
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return (
        <div className={"mx-auto flex max-w-6xl items-center p-2"}>
            <Image
                className={"rounded-lg"}
                src={LinkedinLogoIcon}
                width={"40"}
                height={"40"}
                alt={"Logo"}
            />
            <div className={"flex-1"}>
                <form
                    action=''
                    className={
                        "mx-2 flex max-w-96 flex-1 items-center space-x-1 rounded-md bg-gray-100 p-2"
                    }>
                    <SearchIcon className={"h-4 text-gray-600"} />
                    <input
                        type='text'
                        placeholder={"Search..."}
                        className={"flex-1 bg-transparent outline-none"}
                    />
                </form>
            </div>
            <div className={"flex items-center space-x-4 px-6"}>
                <Link href={""} className={"icon"}>
                    <HomeIcon className={"h-5 w-5"} />
                    <p>Home</p>
                </Link>
                <Link href={""} className={"icon hidden md:flex"}>
                    <UsersIcon className={"h-5 w-5"} />
                    <p>Network</p>
                </Link>
                <Link href={""} className={"icon hidden md:flex"}>
                    <Briefcase className={"h-5 w-5"} />
                    <p>Jobs</p>
                </Link>
                <Link href={""} className={"icon"}>
                    <MessagesSquare className={"h-5 w-5"} />
                    <p>Messaging</p>
                </Link>
                {/*User Button if signed in*/}
                {/*Login Button if not signed in*/}
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage
                                    src={user.user_metadata.avatar_url}
                                    referrerPolicy={"no-referrer"}
                                />
                                <AvatarFallback>
                                    {full_name?.[0].charAt(0).toUpperCase()}
                                    {full_name?.[1]?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <form action={signOut}>
                                    <Button type={"submit"} variant={"ghost"}>
                                        Sign Out
                                    </Button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild variant={"secondary"}>
                        <Link href={"/signin"}>Sign In</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
