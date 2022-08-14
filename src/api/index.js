import axios from 'axios'

const API = axios.create({ baseURL: 'https://pokenewsak.herokuapp.com' }) // Change to deployed backend-url

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchPlayer = (id) => API.get(`/pokemons/${id}`)
export const fetchPlayers = (page) => API.get(`/pokemons?page=${page}`)
export const fetchPlayersBySearch = (searchQuery) => API.get(`/pokemons/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPlayer = (newPlayer) => API.post('/pokemons', newPlayer)
export const likePlayer = (id) => API.patch(`/pokemons/${id}/likePokemon`)
export const comment = (value, id) => API.post(`/pokemons/${id}/commentPokemon`, { value })
export const updatePlayer = (id, updatedPlayer) => API.patch(`/pokemons/${id}`, updatedPlayer)
export const deletePlayer = (id) => API.delete(`/pokemons/${id}`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)