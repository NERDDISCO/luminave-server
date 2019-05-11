import { gql } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions'
export const pubsub = new PubSub()

import { GraphQLScalarType } from 'graphql'
import Kind from 'graphql/language'

const ObjectScalarType = new GraphQLScalarType({
  name: 'Object',
  description: 'Arbitrary object',
  parseValue: (value) => {
    return typeof value === 'object' ? value
      : typeof value === 'string' ? JSON.parse(value)
      : null
  },
  serialize: (value) => {
    return typeof value === 'object' ? value
      : typeof value === 'string' ? JSON.parse(value)
      : null
  },
  parseLiteral: (ast) => {
    switch (ast.kind) {
      case Kind.STRING: return JSON.parse(ast.value)
      case Kind.OBJECT: throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`)
      default: return null
    }
  }
})

let _scenes = []
let _animation = {}

export const schema = gql`
  scalar Object

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
    externalId: String
    dimmer: Int
    duration: Int 
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
  Object: ObjectScalarType,

  Query: { getTimelineScenes: () => _scenes },

  Mutation: {
    setTimelineScenes: (_, { scenes }) => {
      _scenes = scenes
      pubsub.publish('scenesUpdated', _scenes)
      console.log('setTimelineScenes', _scenes)

      return _scenes
    },

    setAnimation: (_, { animation }) => {
      _animation = animation
      pubsub.publish('animationUpdated', _animation)
      console.log('setAnimation', _animation)

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
