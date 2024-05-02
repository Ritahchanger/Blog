const express = require("express");

const router = require("express").Router();

const UserController = require("../controllers/UserController");





router.get('/',UserController.getUsers);
router.get('/:id',UserController.getAUser)
router.post('/',UserController.postUsers);
router.post('/login',UserController.LoginUser);





module.exports = router;