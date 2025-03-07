import { getPublisherDetails, getGamesByPublisher } from "../../services/fetchsApi";
import { setPublisher, setGames, setLoading, setError } from "./publisherSlice";

export const fetchPublisherData = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const publisherData = await getPublisherDetails(id);
      dispatch(setPublisher(publisherData));

      const result = await getGamesByPublisher(id); 
      dispatch(setGames(result)); 
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};