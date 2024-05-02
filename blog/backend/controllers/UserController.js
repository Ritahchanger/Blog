const express = require('express')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const User = require('../models/User.model')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})

    if (!users) return res.send({ status: 404, message: 'Users not found' })

    return res.send({ status: 200, data: users })
  } catch (error) {
    return res.status(500).send({ status: 500, error: error.message })
  }
}

const postUsers = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    const findUser = await User.findOne({ email: email })

    if (findUser) return res.send({ status: 200, emailFound: true })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    })

    return res
      .status(200)
      .send({ status: 200, emailFound: false, data: newUser })
  } catch (error) {
    return res.status(500).send({ status: 500, error: error.message })
  }
}

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const findUser = await User.findOne({ email: email })

    if (!findUser)
      return res.send({ status: 200, emailFound: false, authenticated: false })

    const passwordMatch = await bcrypt.compare(password, findUser.password)

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: findUser._id },
        process.env.AUTHENTICATION__TOKEN,
        { expiresIn: '1h' }
      )

      return res.status(200).send({
        status: 200,
        authenticated: true,
        data: [{ userId: findUser._id, email: findUser.email }],
        token: token
      })
    } else {
      return res
        .status(200)
        .send({ status: 200, passwordFound: false, authenticated: false })
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, error: error.message, authenticated: false })
  }
}

const getAUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user)
      return res.status(404).send({ status: 404, message: 'User not found' })

    res.status(200).send({ status: 200, data: user })
  } catch (error) {
    return res.status(500).send({ status: 500, error: error.message })
  }
}

module.exports = { getUsers, postUsers, getAUser, LoginUser }
