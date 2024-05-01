import React from "react";
import Image from "next/image";
import LinkedinLogoIcon from "@/public/lingedin-logo.png";
import GoogleLogoIcon from "@/public/google-logo.webp";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const SignIn = () => {
    const signIn = async (formData: FormData) => {
        "use server";
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "/auth/callback",
            },
        });

        if (data.url) return redirect(data.url);
    };

    return (
        <form action={signIn} className={"flex flex-col items-center gap-2.5"}>
            <Image src={LinkedinLogoIcon} className={"w-9"} alt={"Logo"} />
            <Button type={"submit"} variant={"secondary"}>
                <Image src={GoogleLogoIcon} width={26} alt={"Google Logo Icon"} />
                Sign in with Google
            </Button>
        </form>
    );
};

export default SignIn;
