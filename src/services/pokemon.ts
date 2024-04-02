import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const getPokemon = async (name: string) => {
    return await axios.get(`${apiUrl}/${name}`).then((resp) => resp.data);
}

export {
    getPokemon,
}