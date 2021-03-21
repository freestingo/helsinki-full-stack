import axios from 'axios'

const url = '/api/people'

const getAll = () =>
    axios.get(url).then(response => response.data)

const create = (person) =>
    axios.post(url, person).then(response => response.data)

const update = (id, newPerson) =>
    axios.put(`${url}/${id}`, newPerson).then(response => response.data)

const remove = (id) =>
    axios.delete(`${url}/${id}`)

export default {getAll, create, update, remove}