import Fastify from 'fastify'
import cors from '@fastify/cors'

import { appRoutes } from './routes'

const app = Fastify()

void app.register(cors)

appRoutes(app)

void app.listen({
  port: 3333
}).then(() => {
  console.log('🚀 Server running at http://localhost:3333/')
})
