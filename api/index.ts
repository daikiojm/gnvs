import { VercelRequest, VercelResponse } from '@vercel/node'
import fastify from 'fastify'

//
// https://www.fastify.io/docs/latest/Serverless/#vercel
// https://vercel.com/docs/serverless-functions/supported-languages#using-typescript
//

const server = fastify({ logger: true, ignoreTrailingSlash: true })

server.get('/', async (request, reply) => {
  return { hello: 'world', request, reply }
})

server.get('/test', async (request, reply) => {
  return { hello: 'world', request, reply }
})

export default async function (req: VercelRequest, res: VercelResponse) {
  await server.ready()
  server.server.emit('request', req, res)
}
