import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res)=> {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message : error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(404).json({ message : error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params 
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No Post with that id")
    }

    const updatedPost =  await PostMessage.findByIdAndUpdate(_id, post, { new: true})
    
    res.json(updatedPost)
    
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No Post with that id")
    }

    await PostMessage.findByIdAndDelete(_id)

    console.log('!DELETE');
    
    
    res.json({ message : 'Post deleted successfully'})
    
}

export const likePost = async (req , res) => {
    const { id: _id } = req.params 

    const { liked } = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No Post with that id")
    }

    const post = await PostMessage.findById(_id)
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount : liked ? post.likeCount + 1 : post.likeCount - 1 }, { new: true})

    res.json(updatedPost)
}




