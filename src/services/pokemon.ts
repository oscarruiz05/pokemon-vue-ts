import axios from "axios";

const getPokemon = async (id: number, apiUrl?: string) => {
    const baseUrl = apiUrl || import.meta.env.VITE_APP_API_URL;
    return await axios.get(`${baseUrl}/${id}`).then((resp) => resp.data);
}

export default {
    getPokemon,
}