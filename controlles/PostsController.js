import PostModel from '../models/Post.js'


export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    
    const post = await doc.save();
    res.json(post)
    
  } catch (error) {
    console.warn("Posts error =>>>", error)
    res.status(400).json({
      message: "Unsuccessfully creating post"
    })
  }
};

export const getALl = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts)
    
  } catch (error) {
    console.warn("Posts error =>>>", error)
    res.status(400).json({
      message: "Unsuccessfully getting posts from the server"
    })
  }
};

export const getOne = (req, res) => {
  try {
    const postId = req.params.id
    PostModel.findOneAndUpdate(
      {
        _id: postId
      },
      {
        $inc: {
          viewCount: 1
        }
      },
      {
        returnDocument: 'after'
      },
      (err, doc) => {
        if(err) {
          console.warn("Error during post return", err)
          return res.status(400).json({
            message: "Can't return the post"
          })
        }
        if(!doc) {
          return res.status(404).json({
            message: "The post is undefined"
          })
        }
        
        res.json(doc)
      }
    )
  } catch (error) {
    console.warn("Posts error =>>>", error)
    res.status(400).json({
      message: "Unsuccessfully getting post from the server"
    })
  }
};

export const remove = (req, res) => {
  try {
    const postId = req.params.id
    
    PostModel.findOneAndDelete(
      {
        _id: postId
      },
      (err, doc) => {
        if(err) {
          console.warn("Can't delete the post", err)
          res.status(404).json({
            message: "Can't delete this post"
          })
        }
        
        if(!doc) {
          console.warn("The post is undefined", err)
          return res.status(404).json({
            message: "The post is undefined"
          })
        }
        
        res.json({
          success: true,
          message: "Post successfully deleted"
        })
      }
    )
    
  } catch (error) {
    console.warn("Posts error =>>>", error)
    res.status(400).json({
      message: "Post not found"
    })
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id
    
    await PostModel.updateOne({
      _id: postId
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    
    res.json({
      success: true,
      message: "Successfully updated"
    })
    
  } catch (error) {
    console.warn("Post's update error =>>>", error)
    res.status(400).json({
      message: "Unsuccessfully updating post"
    })
  }
};