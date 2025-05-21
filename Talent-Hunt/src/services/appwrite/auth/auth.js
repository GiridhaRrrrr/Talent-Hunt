import config from "../../../envConfig/config";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);
      if (user) {
        return this.logIn({ email, password });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logIn({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: Error", error);
      return null;
    }
  }

  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logOut :: Error", error);
    }
  }
}

const authServices = new AuthServices();
export default authServices;