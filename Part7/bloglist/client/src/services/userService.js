import axios from 'axios'
const baseURL = '/api/users'

const getAll = async () => {
  const request = await axios.get(baseURL)
  return request.data
}

const create = async newObject => {
  const request = await axios.post(baseURL,newObject)
  console.log(request)
  return request.data
}

export default { getAll, create }