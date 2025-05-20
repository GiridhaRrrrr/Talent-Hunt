import config from "../../../envConfig/config";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabaseServices{
    client = new Client();
    database;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId); 

        this.database = new Databases(this.client);
    }

    //create

    async createExpert({name, slug, bio, companies, technologies}){
        // here featuredImage is a url that comes from the storage.
        try {

            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteExpertCollectionId,
                slug,
                {
                    name,
                    bio,
                    companies,
                    technologies,
                },

            )
            
        } catch (error) {
            console.log("Appwrite service :: createExpert :: Error" , error);        
        }
    }

    //update

    async updateExpert(slug, {name,bio, companies, technologies}){
        try {

            return await this.database.updateDocument( 
                config.appwriteDatabaseId,
                config.appwriteExpertCollectionId,
                slug,
                {
                    name,
                    bio,
                    companies,
                    technologies,
                },

            )
            
        } catch (error) {
            console.log("Appwrite service :: updateExpert :: Error" , error);        
        }
    }

    // delete
        async deleteExpert(slug){
            try {
                await this.database.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteExpertCollectionId,
                    slug,
                )  
                return true;          
            } catch (error) {
                console.log("Appwrite service :: deleteExpert :: Error" , error);     
                return false;       
            }
        }
    
    //get single expert
        async getExpert(slug){
            try {
                return await this.database.getDocument(
                    config.appwriteDatabaseId,
                    config.appwriteExpertCollectionId,
                    slug,
                )   
     
            } catch (error) {
                console.log("Appwrite service :: getExpert :: Error" , error);
                return false;            
            }
        } 

        async getExpertsByIds(ids) {
            try {
              return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteExpertCollectionId,
                [Query.equal('$id', ids)] // Query multiple experts by IDs
              );
            } catch (error) {
              console.log("Appwrite service :: getExpertsByIds :: Error", error);
              return false;
            }
          }    

        //doamin

    async createDomain({title, slug, featuredImage, expertId}){
        // here featuredImage is a url that comes from the storage.
        try {

            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteDomainCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    expertId,
                },

            )
            
        } catch (error) {
            console.log("Appwrite service :: createDomain :: Error" , error);        
        }
    }

    async updateDomain(slug, {title, featuredImage, expertId}){
        try {

            return await this.database.updateDocument( 
                config.appwriteDatabaseId,
                config.appwriteDomainCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    expertId,
                },

            )
            
        } catch (error) {
            console.log("Appwrite service :: updateDomain :: Error" , error);        
        }
    }

    // delete
        async deleteDomain(slug){
            try {
                await this.database.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteDomainCollectionId,
                    slug,
                )  
                return true;          
            } catch (error) {
                console.log("Appwrite service :: deleteDomain :: Error" , error);     
                return false;       
            }
        }


    // get single Domain
    async getDomain(slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteDomainCollectionId,
                slug,
            )   
 
        } catch (error) {
            console.log("Appwrite service :: getDomain :: Error" , error);
            return false;            
        }
    }
 
}

let databaseServices = new DatabaseServices();

export default databaseServices;
