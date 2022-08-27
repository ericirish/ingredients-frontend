import { alterItems } from 'feathers-hooks-common'
import dayjs from 'dayjs'
import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Event extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Event'
  // Define default properties here
  static instanceDefaults () {
    return {
      sources: []
    }
  }

  static setupInstance (data, { models }) {
    if (data.company) {
      data.company = new models.api.Company(data.company)
    }

    if (data.creator) {
      data.creator = new models.api.User(data.creator)
    }

    return data
  }
}
const servicePath = 'events'
const servicePlugin = makeServicePlugin({
  Model: Event,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [
      // Plays nicely with the date controls
      alterItems((event) => {
        event.date = dayjs(event.date).tz('GMT').format('YYYY-MM-DD')
      })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
