module.exports = async (fastify, options) => {
    const store = fastify.store
    const { shortenValidator } = require('./validators')

    fastify.get('/',           (req, res) => res.sendFile('index.html'))
    fastify.get('/index.html', (req, res) => res.sendFile('index.html'))

    fastify.post('/shorten', shortenValidator, async (req, res) => {
        const url = req.body.url

        try {
            new URL(url)
        }
        catch(err) {
            return res.status(400).send()
        }

        const uuid = await store.shortenUrl(url)
        if(!uuid) return res.status(503).send()

        return res.status(201).send({ uuid })
    })

    fastify.get('/:uuid', async (req, res) => {

        const url = await store.getUrl(req.params.uuid)
        if(!url) return res.status(404).send()

        return res.redirect(url)
    })
}
