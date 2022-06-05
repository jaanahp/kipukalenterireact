import axios from 'axios'

const baseUrl = "https://kipukalenteriapi.azurewebsites.net/kipukalenteri/painlog"

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

const create = newLog => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newLog, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (changedLog) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${changedLog.logId}`, changedLog, config)
}

// eslint-disable-next-line
export default { getAll, create, remove, update, setToken }