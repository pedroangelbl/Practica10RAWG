import { getGames,searchGames,getGamesByDate,getGamesByName } from "../../services/fetchsApi"
import { setGames } from "./gameSlice"


//El thunk es una funcion que devuelve una accion asincrona

//Juegos por rating DEFAULT
export const getGamesThunk = () => {
    return async (dispatch) => {
        const games = await getGames()
        dispatch(setGames({ games: games }))
    }
}

//Juegos del buscador
export const searchGamesThunk = (query) => {
    return async (dispatch) => {
        const games = await searchGames(query)
        dispatch(setGames({ games: games }))
    }
}

//Juegos por fecha de lanzamientos mas recientes
export const getGamesByDateThunk = () => {
    return async (dispatch) => {
        const games = await getGamesByDate()
        dispatch(setGames({ games: games }))
    }
}

//Juegos por nombre de la A a la Z a-Z
export const getGamesByNameThunk = () => {
    return async (dispatch) => {
        const games = await getGamesByName()
        dispatch(setGames({ games: games }))
    }
}
