import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    
  
   id : String ,
   name :   String ,
    description:  String, 
    imageUrl: String , 
    fileUrl: [String] ,

});

const Post = models.Post || model("Post", postSchema);

export default Post;
