import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

const { discard } = require('feathers-hooks-common')

class User extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'User'

  static setupInstance (data, { models }) {
    return data
  }

  static instanceDefaults () {
    return {
      permissions: ''
    }
  }

  get initial () {
    return this.username[0].toUpperCase()
  }

  get roleTitle () {
    if (this.permissions.includes('admin')) { return 'Admin' }
    if (this.permissions.includes('contributor')) { return 'Contributor' }

    return null
  }

  get isAdmin () {
    return this.permissions.includes('admin')
  }
}

const servicePath = 'users'
const servicePlugin = makeServicePlugin({
  Model: User,
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
    patch: [discard(['initials', 'fullName'])],
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
