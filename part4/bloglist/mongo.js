const mongoose = require('mongoose')

const url =
    'mongodb+srv://fullstack:hellsinki@cluster0.bgutp.mongodb.net/bloglist-app?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
  
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'Johnny Bravo Best Line',
    author: 'ErikZek',
    url: 'https://www.youtube.com/watch?v=rkgdwHRCwxs',
    likes: 10
})

blog.save().then(() => {
  console.log('blog saved!')
  mongoose.connection.close()
})