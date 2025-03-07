import { getGames, getGamesByGenre, getUpcomingGames } from "../../services/fetchsApi";
import { setPopularGames, setActionGames, setUpcomingGames, setLoading, setError } from "./homeSlice";

export const fetchPopularGames = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const popular = await getGames();
      dispatch(setPopularGames(popular));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchActionGames = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const action = await getGamesByGenre(4);
      dispatch(setActionGames(action));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchUpcomingGames = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const upcoming = await getUpcomingGames();
      dispatch(setUpcomingGames(upcoming));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};