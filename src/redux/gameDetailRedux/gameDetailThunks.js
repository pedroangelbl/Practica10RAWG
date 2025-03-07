import { getGameDetails } from "../../services/fetchsApi";
import { setGame, setLoading, setError } from "./gameDetailSlice";

export const fetchGameDetails = (id) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const detalles = await getGameDetails(id);
        dispatch(setGame(detalles));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
  };