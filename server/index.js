import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()
import dotenv from 'dotenv';
dotenv.config();

app.use(bodyParser.json({ limit : "30mb", extended : true}))
app.use(bodyParser.urlencoded({ limit : "30mb", extended : true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})


const CONNECTION_URL  = process.env.CONNECTION_URL

const PORT = process.env.PORT

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    })
    .catch((error) => console.log(error.message))

