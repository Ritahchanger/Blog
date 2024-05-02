const Post = require('../models/Post.model')

const router = require('express').Router()

const registerPost = async (req, res) => {
  try {
    const { title, content, author } = req.body

    const imageUrl = req.file.filename

    await Post.create({
      title: title,
      content: content,
      author: author,
      imageUrl: imageUrl
    })

    res.send({ status: 'ok' })
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})

    if (!posts) return res.send({ status: 404, message: 'Posts not found' })

    return res.send({ status: 200, data: posts })
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Post.find({author:id})

    if(!posts) return res.send({status:404,message:"Users not found"});

    return res.send({status:200,data:posts});


  } catch (error) {
    return res.status(500).send({ status: 500, error: error.message })
  }
}

module.exports = { registerPost, getPosts, getPostById }
