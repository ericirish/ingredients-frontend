import { debug } from 'feathers-hooks-common'
import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Group extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Group'
  // Define default properties here
  static instanceDefaults () {
    return {
      name: '',
      members: []
    }
  }

  static setupInstance (data, { models }) {
    // if (data?.members?.length) {
    //   data.members = data.members.map(member => new models.api.Company(member))
    // }

    return data
  }
}
const servicePath = 'groups'
const servicePlugin = makeServicePlugin({
  Model: Group,
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
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [
      debug()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
