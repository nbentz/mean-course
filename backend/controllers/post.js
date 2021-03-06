const Post = require('../models/post');

//creates a post
exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  console.log(url);
  console.log("Create Post");
  //automatically creates the right query to insert data.
  post.save().then( createdPost => {
    res.status(201).json({
      message: 'Post added Succesfully!',
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  }).catch(error =>{
    res.status(500).json({
      message: "Creating a Post failed!"
    });
  });
};

//updates a post
exports.updatePost = (req, res, next) =>{
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  console.log(post);
  Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then( result => {
    if (result.n  > 0){
      res.status(200).json({ message: "Update successful!" });
    }else{
      res.status(401).json({ message: "Not authorized :("})
    }
  }).catch(error=>{
    res.status(500).json({
      message: "Couldn't update post!"
    });
  });
};

//gets all posts
exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if( pageSize && currentPage ) {
    //this approach is not the best for large db's.
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched sucessfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    }).catch(error=>{
      res.status(500).json({
        message: "Fetching a post failed!"
      });
    });
  //res returns since its the last statement in this use function
  // dont call next, there is no other middlware to run.
};

//gets a post
exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then( post=> {
    if (post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'})
    }
  }).catch(error => {
    res.status(500).json({message: "Fetching post failed!"});
  });
};

//deletes a post
exports.deletePost = (req, res, next) => {
  Post.deleteOne ({
    _id: req.params.id,
    creator: req.userData.userId
  }).then( result => {
    if (result.n > 0){
      res.status(200).json({ message: "Deletion Successful!" });
    }else{
      res.status(401).json({ message: "Not authorized :("})
    }
  }).catch( error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    })
  });
};
