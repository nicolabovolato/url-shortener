const { nanoid } = require('nanoid')
const { promisify } = require("util")
const redis = require("redis")

const host = process.env.REDIS_HOST
const port = process.env.REDIS_PORT
const client = redis.createClient(port, host)

client.on('error', console.log)

const get = promisify(client.get).bind(client)
const set = promisify(client.set).bind(client)

const getUrl = async (uuid) => {

    try{
        return await get(uuid)
    }
    catch(err) {
        console.log(err)
        return false
    }
}

const shortenUrl = async (url) => {

    try{
        const uuid = nanoid(10)
        await set(uuid, url)
        return uuid
    }
    catch(err) {
        console.log(err)
        return false
    }
}

module.exports = {shortenUrl, getUrl}
