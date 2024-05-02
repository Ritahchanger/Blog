const express = require('express')

require('dotenv').config()

const database__connection = require('../database/database')

const UserRoute = require('../routes/UserRoute')

const PostRoute = require('../routes/PostRoute')

const CommentRoute = require("../routes/CommentRoute")

const cors = require('cors')

const PORT = process.env.PORT || 8000

const app = express()

app.use('/uploads', express.static('uploads'))

app.use(express.json())

app.use(cors())

app.use('/api/users', UserRoute)
app.use('/api/posts', PostRoute)

app.use('/api/comments',CommentRoute)


const connect__server = async () => {
  try {
    await database__connection()

    app.listen(process.env.PORT, () => {
      console.log(`The server is running @PORT ${PORT}`)
    })
  } catch (error) {
    console.log(`Could not connect server ${error.message}`)
  }
}

connect__server()
