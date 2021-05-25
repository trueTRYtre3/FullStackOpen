import axios from 'axios'
const baseURL = '/api/users'

const getAll = async () => {
  const request = await axios.get(baseURL)
  console.log(request.data)
  return request.data
}

const createUser = async newObject => {
  const request = await axios.post(baseURL,newObject)
  return request.data
}

export default { getAll, createUser }