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

        const inputPathList = [];

        const downloadFile = async (fileUrl, id, j) => {
            const fileName = j + ".txt";
    
            const temp = `./public/assets/temp`;
            const dir1 = `./public/assets/temp/texts`;
            const dir2 = `./public/assets/temp/texts/${id}`;
            const file = `./public/assets/temp/texts/${id}/${fileName}`;
            
            if (!fs.existsSync(temp))    fs.mkdirSync(temp);
            if (!fs.existsSync(dir1))    fs.mkdirSync(dir1);
            if (!fs.existsSync(dir2))   fs.mkdirSync(dir2);
            if (!fs.existsSync(file))  
            {
                const filePath = path.join(dir2, fileName);
                
                const response = await fetch(fileUrl);
                if (!response.ok)  throw new Error(`HTTP error! status: ${response.status}`);
                
                const totalSize = response.headers.get('content-length');
                let downloadedSize = 0;
                
                const fileStream = fs.createWriteStream(filePath);
                response.body.on('data', (chunk) => {
                    downloadedSize += chunk.length;
                    const percentCompleted = ((downloadedSize / totalSize) * 100).toFixed(2);
                    
                    if (percentCompleted % 10 === 0) { // Log every 10%
                        process.stdout.write(`\rProgress: ${percentCompleted}%`);
                    }
                });
                
                response.body.pipe(fileStream);
                
                return new Promise((resolve, reject) => {
                    fileStream.on("finish", () => {
                        console.log(`File downloaded successfully:  { ${id} - ${filePath}}  `);
                        resolve();
                    });
                    fileStream.on("error", (error) => {
                        console.error("Error writing file:", error);
                        reject(error);
                    });
                });
            }else{
                console.log(`file exists ==>> ${file}  `)
                return 
            }
        };
        
        // Download  files
        // create file for everyurl 
        const fileUrlLength = post.fileUrl.length;
        for (let j = 0; j < fileUrlLength; j++) {
            const y = post.fileUrl[j];
            await downloadFile(y, id, j).catch(console.error);
            inputPathList.push(`public\\assets\\temp\\texts\\${id}\\${j}.txt`);
        }
      

        // loop for each folder and merge and change to glb

        const outputPath = `./public/assets/temp/texts/${id}` + "/results.txt";
        if(!fs.existsSync(outputPath)){ 
            try {
                console.log("start mergin")
                await mergeFiles(inputPathList, outputPath);
                console.log("merged successfully")
            } catch (err) {
                console.error(err);
            }
        }  
        
        const readLargeFile = async(file) => {
            try { 
                 const data = await fs.promises.readFile(file); 
                 return data.toString()
            } catch (err) {
                console.error("Error:", err);
            }
        };
        
        // file to glb 
        const outputFilePathGLB = `./public/assets/temp/3d/new-house4-${id}.glb`; // Output file path (PNG format)
        if(!fs.existsSync(outputFilePathGLB)){ 
            try{
                console.log("File does not exist")
                const base64Data =    await  readLargeFile(outputPath);
                const buffer = Buffer.from(base64Data, "base64"); 
                fs.writeFile(outputFilePathGLB, buffer, (err) => {
                    if (err) {
                        console.error("Error writing file:", err);
                    } else {
                        console.log("glb file created successfully!");
                    }
                });
                
            }catch(e){
                console.log(e)
            }
        } 
        
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
