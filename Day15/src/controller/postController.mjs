import { postModel } from "../models/postModel.mjs";
import { createClient } from 'redis';
import { config } from "../../config.mjs";

const client = createClient({
    username: config.redisUserName,
    password: config.redisPassword,
    socket: {
        host: config.redisHost,
        port: config.redisPort
    }
})

client.on('error', err => console.log('Redis Client Error', err));

await client.connect(() => { console.log("connected to Redis") });

const createPost = async (req, res) => {
    try {
        let data = req.body

        await client.set('posts', JSON.stringify(data));
        const result = await client.get('posts');
        //console.log(result)  // >>> bar


        let post = await postModel.create(data)
        return res.status(200).send({ message: 'Post Created', data: post, result: result })

    } catch (error) {
        if (error.message.includes('validation')) {
            return res.status(400).json({ error: error.message });
        } else if (error.message.includes("duplicate")) {
            return res.status(409).json({ error: 'User already exists' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

const getPostMongo = async (req, res) => {
    try {
        let data = await postModel.find()
        if (!data) {
            return res.status(400).send({ message: 'Failed', error: 'No data found' })
        }
        return res.status(200).send({ message: 'Success', data: data })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getPost = async (req, res) => {
    try {
        let data = await client.get('posts')
        data = JSON.parse(data)
        if (!data) {
            return res.status(400).send({ message: 'Failed', error: 'No data found' })
        }
        return res.status(200).send({ message: 'Success', data: data })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export { createPost, getPostMongo, getPost }