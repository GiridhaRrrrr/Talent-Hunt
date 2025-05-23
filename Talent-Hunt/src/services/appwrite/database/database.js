import config from "../../../envConfig/config.js";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabaseServices {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
  }

  // --- Expert Operations ---

  async createExpert({ name, emailOrSocial, location, domain, keywords, confidence, experienceYears }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.expertCollectionId,
        ID.unique(),
        {
          name,
          emailOrSocial,
          location,
          domain,
          keywords,
          confidence,
          experienceYears,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createExpert :: Error", error);
    }
  }

  async getExpert(id) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.expertCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: getExpert :: Error", error);
      return null;
    }
  }

  async listExperts() {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.expertCollectionId
      );
    } catch (error) {
      console.log("Appwrite service :: listExperts :: Error", error);
      return null;
    }
  }

  async deleteExpert(id) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.expertCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteExpert :: Error", error);
      return false;
    }
  }

  async queryExperts(domain, keywords) {
    try {
      const queries = [];
  
      if (domain) {
        queries.push(Query.search("domain", domain));
      }
  
      if (keywords) {
        queries.push(Query.search("keywords", keywords));
      }
  
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.expertCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: queryExperts :: Error", error);
      return { documents: [] };
    }
  }
  

  // --- Search Operations ---

  async createSearch({ domain, keywords }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.searchCollectionId,
        ID.unique(),
        {
          domain,
          keywords,
          timestamp: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createSearch :: Error", error);
    }
  }

  // --- Opt-Out Operations ---

  async createOptOut({ nameOrEmail, reason }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.optOutCollectionId,
        ID.unique(),
        {
          nameOrEmail,
          reason,
          timestamp: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createOptOut :: Error", error);
    }
  }
}

const databaseServices = new DatabaseServices();
export default databaseServices;