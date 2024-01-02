import dotenv from 'dotenv'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV ?? 'development'
export const SERVER_PORT = process.env.SERVER_PORT ?? '5174'
