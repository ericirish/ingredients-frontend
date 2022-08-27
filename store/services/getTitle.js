import feathersClient, { makeServicePlugin, BaseModel } from '~/plugins/feathers'

class GetTitle extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'GetTitle'
  // Define default properties here
  static instanceDefaults () {
    return {}
  }
}
const servicePath = 'get-title'
const servicePlugin = makeServicePlugin({
  Model: GetTitle,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
