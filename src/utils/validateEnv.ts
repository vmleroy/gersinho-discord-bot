export const validateEnv = () => {

    console.log("Validating environment variables...")

    if (!process.env.BOT_TOKEN) {
        console.warn("BOT_TOKEN is not set!");
        return false
    }
    if (!process.env.APPLICATION_ID) {
        console.warn("APPLICATION_ID is not set!");
        return false
    }
    console.log("OK!\n")
    return true
}