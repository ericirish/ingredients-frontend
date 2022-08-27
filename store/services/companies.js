import { convert } from 'url-slug'
import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class Company extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Company'
  // Define default properties here
  static instanceDefaults () {
    return {
      name: '',
      sector: '',
      symbol: '',
      competitorIds: [],
      competitors: [],
      membershipIds: [],
      memberships: [],
      checklist: [],
      owns: [],
      score: 0
    }
  }

  static setupInstance (data, { models }) {
    if (data?.competitors?.length) {
      data.competitors = data.competitors.map(competitor => models.api.Company.getFromStore(competitor._id) || new models.api.Company(competitor))
    }

    if (data?.memberships?.length) {
      data.memberships = data.memberships.map(membership => models.api.Group.getFromStore(membership._id) || new models.api.Group(membership))
    }

    if (data.creator) {
      data.creator = new models.api.User(data.creator)
    }

    return data
  }

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
const servicePath = 'companies'
const servicePlugin = makeServicePlugin({
  Model: Company,
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
