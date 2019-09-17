import axios from 'axios'
const baseUrl = 'https://x9csh.sse.codesandbox.io/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll: getAll,
  create: create,
  del: del,
  update: update
}