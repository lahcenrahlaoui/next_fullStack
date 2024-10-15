// pages/api/upload.js

import fs from "fs";
import fetch from "node-fetch";
import cloudinary from "@/utils/cloudinary";
export const POST = async (req, res) => {
    const randomTexts = (length) => {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    };

    const { image2 } = await req.json();

    const convertBase64ToImage = async (base64DataURI) => {
        const base64Data = base64DataURI.replace(
            "data:application/octet-stream;base64,",
            ""
        );
        //@ important to change this
        const base64DataBIG = Array(lengthArray)
            .fill("")
            .map((_, index) => {
                return base64Data.slice(
                    index * numberBig,
                    (index + 1) * numberBig
                );
            });
        for (let i = 0; i < lengthArray; i++) {
            fs.writeFile(filePath[i], base64DataBIG[i], (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log("text file created successfully!");
                }
            });
        }
        //@ important to change this
        //! delay
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(2000);
        //! delay
    };

    const base64DataURI = image2;
    const numberBig = 10000000;
    const lengthArray = Math.ceil(base64DataURI.length / numberBig);
    const filePath = Array(lengthArray)
        .fill("")
        .map(() => {
            return `./public/assets/3d/temp-output-${randomTexts(10)}.txt`;
        });
    await convertBase64ToImage(base64DataURI);

    try {
        const uploadResponse = [];
        for (let i = 0; i < filePath.length; i++) {
            const x = await cloudinary.uploader.upload(filePath[i], {
                resource_type: "raw",
            });
            console.log(` uploaded successfully  ==> ${filePath[i]}`)
            uploadResponse.push(x);
        }

        return new Response(JSON.stringify(uploadResponse), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("data", { status: 404 });
    }
};
