import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const getPokemon = async (id: number) => {
    return await axios.get(`${apiUrl}/${id}`).then((resp) => resp.data);
}

export default {
    getPokemon,
}