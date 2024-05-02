const express = require("express");


const Comment = require("../models/Comment.model");



const postComment = async (req,res) =>{

    try{

        const newComment = await Comment.create(req.body)

        if(!newComment) return res.send({status:400,message:"Bad request"});

        return res.send({status:200,message:"comment registered successfully",data:newComment})


    }catch(error){

        return res.send({status:500,error:error.message});

    }

}

const getComments = async (req,res) =>{
    try{

        const comments = await Comment.find({});

        if(!comments) return res.send({status:404,message:"Comments not found"})

        return res.send({status:200,data:comments})

    }catch(error){
        return res.send({status:500,error:error.message});
    }
}


module.exports = { postComment,getComments };