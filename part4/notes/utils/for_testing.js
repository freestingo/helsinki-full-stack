const palindrome = str =>
	[...str].reverse().join('')

const average = array => array.length === 0
	? 0
	: array.reduce((acc, a) => acc + a) / array.length

module.exports = { palindrome, average }