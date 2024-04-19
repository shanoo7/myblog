import { config_env } from "../config_env/config_env";
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client.setEndpoint(config_env.appwriteUrl)
            .setProject(config_env.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAcount({ email, password, name }) {  //create
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //usee another method  
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({ email, password }) {             //login
        try {
            return await this.account.createEmailSession(email, password);
            
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {                   //current user active/unactive
        try {
            return await this.account.get()
        
        } catch (error) {
            console.log("error", error);

        }
        return null;
    }
    async logout() {                           //logout
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }

    }
}



const authservice = new AuthService()
export default authservice;
