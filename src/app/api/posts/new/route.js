import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
    const { id, name, description, imageUrl, fileUrl } = await req.json();
  console.log("POST")
    try {
        await connectToDB();
        const newPost = await Post.create({
            id,
            name,
            description,
            imageUrl,
            fileUrl,
        });
        await newPost.save();
        const data = JSON.stringify(newPost);
        return new Response(data, { status: 201 });
    } catch (e) {
        console.error(e);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};
