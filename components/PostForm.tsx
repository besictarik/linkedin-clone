"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { createPost } from "@/utils/actions/post";
import Image from "next/image";
import { toast } from "sonner";

const PostForm = ({ user }: { user: any }) => {
    const ref = useRef<HTMLFormElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // There is bug where it still saves the uploaded image after removing it
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) setPreview(URL.createObjectURL(file));
        textInputRef.current?.focus();
    };

    const handlePostAction = async (formData: FormData) => {
        const formDataCopy = formData;
        const text = formDataCopy.get("postInput") as string;
        if (!text.trim()) throw Error;
        ref.current?.reset();
        setPreview(null);
        await createPost(formDataCopy);
    };

    return (
        <div className={"mb-2"}>
            <form
                action={(formData) => {
                    const promise = handlePostAction(formData);
                    toast.promise(promise, {
                        loading: "Creating post...",
                        success: "Post created",
                        error: "Failed to create post",
                    });
                }}
                ref={ref}
                className={"rounded-lg border bg-white p-3"}>
                <div className={"flex items-center space-x-2"}>
                    <Avatar>
                        {user ? (
                            <AvatarImage
                                src={user.user_metadata.avatar_url}
                                alt={"User Profile Photo"}
                                referrerPolicy={"no-referrer"}
                            />
                        ) : (
                            <AvatarImage
                                src={"https://avatars.githubusercontent.com/u/76400418?v=4"}
                                alt={"Profile Photo Placeholder"}
                            />
                        )}
                        <AvatarFallback>{user?.email.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <label htmlFor={"post-input"} className={"sr-only"}>
                        Post Text Content
                    </label>
                    <input
                        ref={textInputRef}
                        type='text'
                        name={"postInput"}
                        id={"post-input"}
                        placeholder={"Start writing a post..."}
                        className={"flex-1 rounded-full border px-4 py-3 outline-none"}
                        required
                    />
                    <label htmlFor={"post-image"} className={"sr-only"}>
                        Post Image
                    </label>
                    <input
                        ref={fileInputRef}
                        type='file'
                        name={"image"}
                        id={"post-image"}
                        accept={"image/*"}
                        onChange={(e) => handleImageChange(e)}
                        hidden
                    />
                    <button type={"submit"} hidden>
                        Post
                    </button>
                </div>
                {/*Preview conditional check*/}
                {preview && (
                    <div className={"mt-3"}>
                        <Image
                            src={preview}
                            alt='Upload Image Preview'
                            width={500}
                            height={500}
                            className={"w-full object-cover"}
                        />
                    </div>
                )}
                <div className={"mt-2 flex justify-end space-x-2"}>
                    <Button
                        type={"button"}
                        variant={"outline"}
                        onClick={() => fileInputRef.current?.click()}>
                        <ImageIcon className={"mr-2"} size={16} color={"currentColor"} />
                        {preview ? "Change" : "Add"} image
                    </Button>
                    {/*Add a remove preview button*/}
                    {preview && (
                        <Button
                            type={"button"}
                            variant={"outline"}
                            onClick={() => {
                                setPreview(null);
                                // @ts-ignore
                                ref.current.elements["image"].value = "";
                            }}>
                            <XIcon className={"mr-2"} size={16} color={"currentColor"} />
                            Remove image
                        </Button>
                    )}
                </div>
            </form>
            <hr className={"mt-2 border-gray-300"} />
        </div>
    );
};

export default PostForm;
