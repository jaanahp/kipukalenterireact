import axios from 'axios'

const baseUrl = "https://localhost:5001/kipukalenteri/note"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newNote => {
    return axios.post(baseUrl, newNote)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (changedNote) => {
    return axios.put(`${baseUrl}/${changedNote.noteId}`, changedNote)
}

// eslint-disable-next-line
export default { getAll, create, remove, update }