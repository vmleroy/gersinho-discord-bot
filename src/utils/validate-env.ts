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

  if (process.env.YOUTUBE_COOKIE) {
    try {
      JSON.parse(process.env.YOUTUBE_COOKIE)
    } catch (error) {
      console.error('YOUTUBE_COOKIE is not a valid JSON')
      return false
    }
  }
  
  console.log('Environment variables are valid')
  return true
} 