const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteExpertCollectionId: String(import.meta.env.VITE_APPWRITE_EXPERT_COLLECTION_ID),
    appwriteDomainCollectionId: String(import.meta.env.VITE_APPWRITE_DOMAIN_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}


export default config;