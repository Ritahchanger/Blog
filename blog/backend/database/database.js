const mongoose = require('mongoose')

require('dotenv').config()

const database__connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('The database connected successfully')
  } catch (error) {
    console.log(`An error occured while connecting db ---> ${error.message}`)
  }
}

module.exports = database__connection;