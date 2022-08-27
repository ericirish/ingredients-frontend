import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class SectorAverageScore extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'SectorAverageScore'
  // Define default properties here
  static instanceDefaults () {
    return {}
  }
}
const servicePath = 'sector-average-score'
const servicePlugin = makeServicePlugin({
  Model: SectorAverageScore,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
