import axios from 'axios'

const baseUrl = "https://kipukalenteriapi.azurewebsites.net/kipukalenteri/painlocation"

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

const create = newLocation => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newLocation, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (changedLocation) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${changedLocation.locationId}`, changedLocation, config)
}

// eslint-disable-next-line
export default { getAll, create, remove, update, setToken }