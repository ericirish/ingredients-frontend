import { convert } from 'url-slug'
import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Pairing extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Pairing'

  // ///////////////////////////////////////////////////
  // This a workaround for when the _id field is custom
  // https://github.com/feathersjs-ecosystem/feathers-vuex/issues/542#issuecomment-715790408
  // static idField = 'slug'
  // ///////////////////////////////////////////////////

  get sectorSlug () {
    return convert(this.sector)
  }

  get ownsChildCompanies () {
    return this.owns.length
  }
}
const servicePath = 'pairings'
const servicePlugin = makeServicePlugin({
  Model: Pairing,
  service: feathersClient.service(servicePath),
  servicePath
  // idField: 'slug'
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
