import { gql } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions'
export const pubsub = new PubSub()

let _scenes = []

export const schema = gql`
  """
  Contains all scenes
  """
  type Timeline {
    scenes: [Scene]!
  }

  type Scene {
    name: String
  }

  input SceneInput {
    name: String
  }

  type Query {
    getTimelineScenes: [Scene]
  }

  type Mutation {
    setTimelineScenes(scenes: [SceneInput]): [Scene]
  }

  type Subscription {
    timelineScenesUpdated: [Scene]
  }
`

export const resolvers = {
  Query: {
    getTimelineScenes: () => _scenes
  },

  Mutation: {
    setTimelineScenes: (_, { scenes }) => {
      _scenes = scenes

      // Publish an event that the part was added
      pubsub.publish('scenesUpdated', _scenes)

      return _scenes
    }
  },

  Subscription: {
    timelineScenesUpdated: {
      resolve: payload => payload,
      subscribe: () => pubsub.asyncIterator('scenesUpdated')
    }
  }
}
