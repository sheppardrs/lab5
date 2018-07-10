import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;

  post.save()
    .then((result) => {
      res.json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find({}, 'id title tags cover_url').sort([['_id', -1]]).then((posts) => {
    res.send(posts);
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    // console.log(post._id.getTimestamp());
    res.send(post);
  });
};

export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id).then((post) => {
    res.send(post);
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    cover_url: req.body.cover_url,
    tags: req.body.tags,
  }).then((newpost) => {
    res.send(newpost);
  });
};
