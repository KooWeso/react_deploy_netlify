import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3500',
  //works only on your pc obviosly
  //after deploying server with `npx json-server -p http://localhost:3500`
})
