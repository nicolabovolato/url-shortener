
require('dotenv').config()

const fastify = require('fastify')({logger: true})
const path = require('path')

fastify.decorate('store', require('./decorators/redis'))
fastify.register(require('fastify-static'), {root: path.join(__dirname, 'public')})

fastify.register(require('./routes.js'))

fastify.listen(3000, '0.0.0.0', (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
