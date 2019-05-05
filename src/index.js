import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import dotenv from 'dotenv'

// Parse the .env file
dotenv.config()

/**
 * Host of the luminave-server
 */
const host = process.env.HOST || 'localhost'

/**
 * Port of the luminave-server
 */
const port = process.env.PORT || 4000

import { 
  schema as timelineSchema,
  resolvers as timelineResolvers
} from './schemas/timeline'

// Combine schemas & resolvers
const schema = makeExecutableSchema({
  typeDefs: [timelineSchema],
  resolvers: [timelineResolvers]
})

// Create the server and add the combined schema
const server = new ApolloServer({ 
  schema, 
  debug: true 
})

// Start the server
server.listen({ host, port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
