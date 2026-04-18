import { apiConfig } from "./ApiConfig";
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${apiConfig.pokemon}`)
        if (!response.ok) {
            throw new Error("error al hacer el fetch")
        }
        const dataResponse = await response.json();
        return dataResponse;
    }

    catch (error) {
        console.log("Error", error.message);
    }
}
export const getPokemonById = async (pokeID) => {
    try {
        const response =await fetch(`http://localhost:3000/pokemon/${pokeID}`);
        if (!response.ok) {
            throw new Error("error al hacer el fetch")
        }
        const dataResponse = await response.json();
        return dataResponse;

    } catch (error) {
        console.log(error.message)
    }
}