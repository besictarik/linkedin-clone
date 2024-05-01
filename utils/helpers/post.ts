export const getImageURL = (image_name: string): string => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/post_images/${image_name}`;
};
