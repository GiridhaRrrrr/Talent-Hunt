const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    expertCollectionId: String(import.meta.env.VITE_APPWRITE_EXPERT_COLLECTION_ID),
    searchCollectionId: String(import.meta.env.VITE_APPWRITE_SEARCHES_COLLECTION_ID),
    optOutCollectionId: String(import.meta.env.VITE_APPWRITE_SEARCHES_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}


export default config;