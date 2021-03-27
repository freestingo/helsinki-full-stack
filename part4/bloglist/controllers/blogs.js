const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (_, response) => {
	Blog
		.find({})
		.then(blogs => response.json(blogs)) // no mapping necessary?
})

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => response.status(201).json(result))
})

blogsRouter.get('/:id', (request, response, next) => {
	Blog
		.findById(request.params.id)
		.then(blog => blog
			? response.json(blog.toJSON())
			: response.status(404).end()
		)
		.catch(error => next(error))
})

module.exports = blogsRouter