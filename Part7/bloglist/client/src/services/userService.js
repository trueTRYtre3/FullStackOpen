import axios from 'axios'
const baseURL = '/api/users'

const getAll = async () => {
  const request = axios.get(baseURL)
  return request.data
}

const createUser = async newObject => {
  const request = axios.post(baseURL,newObject)
  return request.data
}

export default { getAll, createUser }