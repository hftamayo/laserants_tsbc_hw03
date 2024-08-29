import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnection, setCorsEnviro } from './config/setup'
import { port, mode } from './config/envvars'

import healthCheckRouter from './api/routes/hc'

const backend: express.Application = express()

const PORT = port || 5001

async function StartBackend() {
  try {
    await dbConnection()
    backend.use(cors(setCorsEnviro))
    backend.use(express.json())
    backend.use(express.urlencoded({ extended: true }))
    backend.use(cookieParser())

    //method for request monitoring and logging
    backend.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`Request received: [${req.method}] ${req.path}`)
      console.log(`Request headers: ${JSON.stringify(req.headers)}`)
      next()
    })

    backend.use('/health', healthCheckRouter)

    //error handling middleware
    backend.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('Unexpected error:', err.message)
        console.error('Stack trace:', err.stack)
        res.status(500).send('An unexpected error occurred')
      },
    )

    const server = backend.listen(PORT, () => {
      console.log(`Server running in ${mode} mode on port ${PORT}`)
    })
    return server
  } catch (error: unknown) {
    console.error('Failed to start backend', error)
    process.exit(1)
  }
}

export { backend, StartBackend }
