import dotenv from 'dotenv'

export const validateEnv = (): boolean => {
  dotenv.config();

  if (!process.env.BOT_TOKEN) {
    console.error('BOT_TOKEN is required')
    return false
  }
  if (!process.env.APPLICATION_ID) {
    console.error("APPLICATION_ID is required");
    return false
  }
  
  console.log('Environment variables are valid')
  return true
}