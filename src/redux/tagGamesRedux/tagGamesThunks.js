import { getTagDetails, getGamesByTag } from "../../services/fetchsApi";
import { setTag, setGames, setLoading, setError } from "./tagGamesSlice";

export const fetchTagData = (id, page = 1) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const tagData = await getTagDetails(id);
      dispatch(setTag(tagData));

      const result = await getGamesByTag(id, page); 
      dispatch(setGames(result)); 
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};