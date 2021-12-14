import axios from 'axios'

const baseUrl = "https://localhost:5001/kipukalenteri/painlog"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newLog => {
    return axios.post(baseUrl, newLog)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (changedLog) => {
    return axios.put(`${baseUrl}/${changedLog.logId}`, changedLog)
}

// eslint-disable-next-line
export default { getAll, create, remove, update }