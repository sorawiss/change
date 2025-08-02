import { View, Text } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { colors } from "../style-sheet"
import { useState } from "react"
import { useAuth } from "../AuthContext"
import { createTask } from "@/utils/DALs"


function AddScreen() {
    const { user } = useAuth()
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit() {
        if (!user) {
            return
        }

        try {
            await createTask(title, user.$id)
            setTitle("")
            setError("")
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                return
            }
            setError("Failed to create task")
        }
    }

    return (
        <View style={{ backgroundColor: colors.background }} >
            <TextInput
                label="Title"
                mode="outlined"
                value={title}
                onChangeText={setTitle}
            />

            <Button mode="contained" style={{ margin: 10 }}
                disabled={title.length === 0}
                onPress={handleSubmit}
            >
                Add
            </Button>
            {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
    )



}
export default AddScreen