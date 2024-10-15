import Post from "@/models/post";
import cloudinary from "@/utils/cloudinary";

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import mergeFiles from "merge-files";

import { connectToDB } from "@/utils/database";

export const GET = async (req ) => {
    
    const getId = await req.headers 
    const id = getId.get("id") 

 
    try {
        await connectToDB();

        const post = await Post.findOne({ id  });
        console.log(post)

       
       

        const x = {
            id: id,
            name : post.name,
            description : post.description , 
            fileUrl: `/assets/temp/3d/new-house4-${id}.glb`,
        };
        const data = JSON.stringify(x);
        console.log(data)

        return new Response(data, { status: 200 });

        /**************************** */
    } catch (e) {
        console.log("error getting posts");
        return new Response("Internal Server Error", { status: 500 });
    }
};
export const PATCH = async (request, { params }) => {
    const { post, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing post by ID
        const existingPost = await Post.findById(params.id);

        if (!existingPost) {
            return new Response("Post not found", { status: 404 });
        }

        // Update the post with new data
        existingPost.post = post;
        existingPost.tag = tag;

        await existingPost.save();

        return new Response("Successfully updated the Posts", {
            status: 200,
        });
    } catch (error) {
        return new Response("Error Updating Post", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the post by ID and remove it
        await Post.findByIdAndRemove(params.id);

        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting post", { status: 500 });
    }
};
