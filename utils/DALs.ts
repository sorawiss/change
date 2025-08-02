import { COLLECTION_ID, DATABASE_ID, databases } from "@/lib/appwrite"
import { ID, Query } from "react-native-appwrite"


// Create a new task
export async function createTask(title: string, userId: string) {
    const task = {
        user_id: userId,
        title,
        streak_count: 0,
        created_at: new Date().toISOString(),
        last_complete: new Date().toISOString()
    }

    await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        task
    )
}


// Get all tasks
export async function getAllTasks(userId: string) {
    const tasks = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("user_id", userId)]
    )

    return tasks.documents
}