import { gql } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions'
export const pubsub = new PubSub()
import config from '../config.js'

let _scenes = []
let _animation = {}

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

  type Animation {
    """ID of the animation that is created by an external system (e.g. Thorium)"""
    externalId: String
    dimmer: Int
    duration: Int 
    color: [Int]
    action: String
    actionStrength: Float
  }

  input AnimationInput {
    """ID of the animation that is created by an external system (e.g. Thorium)"""
    externalId: String!
    dimmer: Int!
    duration: Int!
    color: [Int]
    action: String
    actionStrength: Float
  }

  type Query {
    getTimelineScenes: [Scene]
  }

  type Mutation {
    setTimelineScenes(scenes: [SceneInput]): [Scene]
    setAnimation(animation: AnimationInput): Animation
  }

  type Subscription {
    timelineScenesUpdated: [Scene]
    animationUpdated: Animation
  }
`

export const resolvers = {
  Query: { getTimelineScenes: () => _scenes },

  Mutation: {
    setTimelineScenes: (_, { scenes }) => {
      _scenes = scenes
      pubsub.publish('scenesUpdated', _scenes)

      if (config.env === 'development') {
        console.log('setTimelineScenes', _scenes)
      }

      return _scenes
    },

    setAnimation: (_, { animation }) => {
      _animation = animation
      pubsub.publish('animationUpdated', _animation)

      if (config.env === 'development') {
        console.log('setAnimation', _animation)
      }

      return _animation
    }
  },

  Subscription: {
    timelineScenesUpdated: {
      resolve: payload => payload,
      subscribe: () => pubsub.asyncIterator('scenesUpdated')
    },

    animationUpdated: {
      resolve: payload => payload,
      subscribe: () => pubsub.asyncIterator('animationUpdated')
    }
  }
}
