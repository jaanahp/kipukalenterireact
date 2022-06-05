import axios from 'axios'

const url = "https://kipukalenteriapi.azurewebsites.net/kipukalenteri/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    return request.then(response => response.data)
}

export default { authenticate }