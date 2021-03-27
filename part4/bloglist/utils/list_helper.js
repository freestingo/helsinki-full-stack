const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = posts =>
	posts
		.map(post => post.likes)
		.reduce((acc, a) => acc + a, 0)

const favoriteBlog = posts =>
	posts.reduce((a, b) => a?.likes > b.likes ? a : b, void 0)

const mostBlogs = posts =>
	/*
	const reduction =
		Object.entries(_.groupBy(posts, 'author'))
			.map(group => [group[0], group[1].length])
			.reduce((a, b) => a[1] > b[1] ? a : b)

	return { 'author': reduction[0], 'blogs': reduction[1] }
	*/
	Object.fromEntries(
		Object.entries(_.groupBy(posts, 'author'))
			.map(group => [group[0], group[1].length])
			.reduce((a, b) => a[1] > b[1] ? a : b)
			.map((val, ind) => [ind === 0 ? 'author' : 'blogs', val])
	)

const mostLikes = posts =>
	Object.fromEntries(
		Object.entries(_.groupBy(posts, 'author'))
			.map(group => [group[0], group[1].reduce((acc, a) => acc + a.likes, 0)])
			.reduce((a, b) => a[1] > b[1] ? a : b)
			.map((val, ind) => [ind === 0 ? 'author' : 'likes', val])
	)
	

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }