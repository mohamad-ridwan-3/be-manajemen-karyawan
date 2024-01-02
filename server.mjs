import './loadEnv.mjs'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { resolvers } from './src/graphql/resolvers/resolvers.mjs'
import { connectDB } from './src/dbConnection.mjs'
import {schema} from './src/graphql/schemas/schema.mjs'

const app = express()
const httpServer = http.createServer(app)

// app.use((req, res, next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   )
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization', 'Origin', 'X-Requested-With')
// })

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true
})

connectDB()
  .then(async () => {
    await server.start()

    app.use(
      cors(),
      bodyParser.json(),
      expressMiddleware(server)
    )

    const PORT = process.env.PORT || 4000

    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))

    console.log(`🚀 Server ready at ${PORT}`)
  })