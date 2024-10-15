// import fs from "fs"
 

// export const  func = (image) =>{

    
//     const convertBase64ToImage = (base64DataURI, outputFilePath) => {
//     // Split the base64 string and remove the data URL prefix
//     const base64Data = base64DataURI.replace(
//         /^data:image\/\w+;base64,/,
//         ""
//     );

//     // Decode the Base64 string to binary data
//     const buffer = Buffer.from(base64Data, "base64");

//     // Write the binary data to a file
//     fs.writeFile(outputFilePath, buffer, (err) => {
//         if (err) {
//             console.error("Error writing file:", err);
//         } else {
//             console.log("Image file created successfully!");
//         }
//     });
// };

// // Example usage:
// const base64DataURI = image; // Your Base64 Data URI
// const randomNumber =
//     Math.floor(Math.random() * 10000) +
//     Math.floor(Math.random() * 10000) +
//     Math.floor(Math.random() * 10000);
// const outputFilePath = `./public/assets/3d/output-image${randomNumber}.glb`; // Output file path (PNG format)
// console.log(outputFilePath);
// convertBase64ToImage(base64DataURI, outputFilePath);
// }