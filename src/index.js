import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import config from './config.js'

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

const { host, port } = config

// Start the server
server.listen({ host, port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
