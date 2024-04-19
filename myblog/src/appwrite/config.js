import { config_env } from "../config_env/config_env";
import {Client, Databases, Storage, ID, Query} from "appwrite"

class Service{
    client = new Client();
    Databases;
    bucket;


    constructor(){
        this.client.setEndpoint(config_env.appwriteUrl)
        .setProject(config_env.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }


       //create Post
 
  async createPost({title, slug, content, image, status, userId}){
    try {
        return await this.databases.createDocument(
          config_env.appwriteDataBaseId,
          config_env.appwriteCollectionId,
            slug,
            {
                title,
                content,
                image,
                status,
                userId,
            }
        )
    } catch (error) {
        console.log("Appwrite serive :: createPost :: error", error);
    }
}


    //update Post
   async updatePost(slug,{title, content, image, status}){
   try {
   return await this.databases.updateDocument(
        config_env.appwriteDataBaseId,
        config_env.appwriteCollectionId,
        slug,
        {
            title,
            content,
            image,
            status,
            //slug  
           }
    )
   } catch (error) {
    console.log("error :: update post", error);
    }
   } 


    //delete Post
    async deletePost(slug){
       try {
        await this.databases.deleteDocument(
            config_env.appwriteDataBaseId,
            config_env.appwriteCollectionId,
            slug //ID.unique()
        )
        return true;
       } catch (error) {
        console.log("error :: delete post", error);
        return false;
       }
    }


    //get post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config_env.appwriteDataBaseId,
                config_env.appwriteCollectionId,
               slug //ID.unique()
            )
        } catch (error) {
            console.log("error :: get single post", error);
            return false;
        }
    }


    //get posts
    async getPosts(queries=[Query.equal("status","active")]){
      try {
        return await this.databases.listDocuments(
                config_env.appwriteDataBaseId,
                config_env.appwriteCollectionId,
                queries,
        )
      } catch (error) {
        console.log("error :: get filtered all post", error);
        return false;
      }
    }


    //file upload service......
     async uploadFile(file){
       try {
        return await this.bucket.createFile(
            config_env.appwriteBucketId,
            ID.unique(),
            file
        )
       } catch (error) {
        console.log("error :: file upload service ", error);
        return false;
       }
     }


     //file delete service......
     async deleteFile(fileId){
      try {
        return await  this.bucket.deleteFile(
            config_env.appwriteBucketId,
            fileId
             
        )
      } catch (error) {
        console.log("error :: file delete service ", error);
        return false;
      }
     }


     //file preview service......
     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config_env.appwriteBucketId,
            fileId
        )

     }


}

const service= new Service()
export default service;
