const dummy = blogs => 1

const totalLikes = posts =>
	posts
		.map(post => post.likes)
		.reduce((acc, a) => acc + a, 0)

const favoriteBlog = posts =>
	posts.reduce((a, b) => a?.likes > b.likes ? a : b, void 0)

module.exports = { dummy, totalLikes, favoriteBlog }