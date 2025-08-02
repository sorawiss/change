import { Client, Databases, Account } from "react-native-appwrite";
const client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform('sorawiss.change');

export const account = new Account(client);
export const databases = new Databases(client);



export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
export const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!
