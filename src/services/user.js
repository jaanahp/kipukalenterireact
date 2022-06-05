import axios from 'axios'

const baseUrl = "https://kipukalenteriapi.azurewebsites.net/kipukalenteri/user"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (changedUser) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${changedUser.username}`, changedUser, config)
}

// eslint-disable-next-line
export default { getAll, create, remove, update, setToken }