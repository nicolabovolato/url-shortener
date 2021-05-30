const shortenValidator = {
  schema: {
    body: {
      type: 'object',
      required: ['url'],
      properties: {
        url: { type: 'string' }
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          uuid: { type: 'string' }
        }
      }
    }
  }
}

module.exports = {shortenValidator}
