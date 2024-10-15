import Post from "@/models/post";
import cloudinary from "@/utils/cloudinary";

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import mergeFiles from "merge-files";

import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();

        const posts = await Post.find({});

        console.log("posts")
        console.log(posts)

        const x = posts.map((post, idx) => {
            return {
                id: post.id,
                name: post.name,
                description: post.description,
                imageUrl: post.imageUrl,
                fileUrl: `/assets/3d/new-house4-${idx}.glb`,
            };
        });
        const data = JSON.stringify(x);

        return new Response(data, { status: 200 });
    } catch (e) {
        console.log("error getting posts");
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
