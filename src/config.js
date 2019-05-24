import dotenv from 'dotenv'

// Parse the .env file
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  // Host of the luminave-server
  host: process.env.HOST || 'localhost',
  // Port of the luminave-server
  port: parseInt(process.env.PORT) || 4000  
}

export default config
