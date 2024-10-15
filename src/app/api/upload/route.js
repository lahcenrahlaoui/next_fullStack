// pages/api/upload.js
import cloudinary from "@/utils/cloudinary";
import fs from "fs";
export const POST = async (req, res) => {
    const { image } = await req.json();
 
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

    const convertBase64ToImage = (base64DataURI, outputFilePath) => {
        console.log(base64DataURI)
        const base64Data = base64DataURI.replace(
            /^data:image\/\w+;base64,/,
            ""
        );
        const buffer = Buffer.from(base64Data, "base64");

        // Write the binary data to a file
        fs.writeFile(outputFilePath, buffer, (err) => {
            if (err) {
                console.error("Error writing file:", err);
            } else {
                console.log("Image file created successfully!");
            }
        });
    };

    // Example usage:
    const base64DataURI = image; // Your Base64 Data URI
    const randomNumber = randomTexts(20);
    const outputFilePath = `./public/assets/images/temp-output-image${randomNumber}.png`; // Output file path (PNG format)
    console.log(outputFilePath);
    convertBase64ToImage(base64DataURI, outputFilePath);
    try {
        console.log("else here ");
        const uploadResponse = await cloudinary.uploader.upload(outputFilePath);
        const result = uploadResponse;
        fs.unlinkSync(outputFilePath);

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("data", { status: 404 });
    }
};
