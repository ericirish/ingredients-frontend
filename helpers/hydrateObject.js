import { models } from 'feathers-vuex'

export const hydrateObject = (obj, modelName) => {
  console.log(obj)
  // Already hydrated.
  if (obj && obj.constructor && obj.constructor.name === modelName) {
    return obj
  }

  if (typeof modelName !== 'string' || !models.api[modelName]) {
    throw new Error('Please pass a valid model name to hydrateObject')
  }

  const Model = models.api[modelName]

  // Return the feathers-vuex record from the obj's id.
  if (typeof obj.id !== 'undefined' && typeof Model !== 'undefined') {
    return Model.getFromStore(obj.id)
  }

  return obj
}
