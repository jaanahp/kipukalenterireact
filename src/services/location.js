import axios from 'axios'

const baseUrl = "https://localhost:5001/kipukalenteri/painlocation"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newLocation => {
    return axios.post(baseUrl, newLocation)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (changedLocation) => {
    return axios.put(`${baseUrl}/${changedLocation.locationId}`, changedLocation)
}

// eslint-disable-next-line
export default { getAll, create, remove, update }