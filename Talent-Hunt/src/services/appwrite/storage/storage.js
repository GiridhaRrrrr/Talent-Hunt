import config from "../../../envConfig/config";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: Error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: Error", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.storage.getFileView(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: Error", error);
      return null;
    }
  }
}

const storageService = new StorageService();
export default storageService;
