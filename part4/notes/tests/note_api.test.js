const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const initialNotes = [
	{
		content: 'HTML is easy',
		date: new Date(),
		important: false,
	},
	{
		content: 'Browser can execute only Javascript',
		date: new Date(),
		important: true,
	},
]
beforeEach(async () => {
	await Note.deleteMany({})
	let noteObject = new Note(initialNotes[0])
	await noteObject.save()
	noteObject = new Note(initialNotes[1])
	await noteObject.save()
})


test('notes are returned as json', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all notes from the testing db are returned', async () => {
	const response = await api.get('/api/notes')
	expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
	const response = await api.get('/api/notes')
	const contents = response.body.map(n => n.content)
	expect(contents).toContain('HTML is easy')
})

test('a valid note can be added', async () => {
	const content = 'async/await simplifies making async calls'
	const newNote = {
		content,
		important: true,
	}
	await api
		.post('/api/notes')
		.send(newNote)
		.expect(200)
		.expect('Content-Type', /application\/json/)
	
	const response = await api.get('/api/notes')
	const contents = response.body.map(n => n.content)

	expect(response.body).toHaveLength(initialNotes.length + 1)
  	expect(contents).toContain(content)
})

afterAll(() => mongoose.connection.close())