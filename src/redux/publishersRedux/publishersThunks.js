import { getPublishers, searchPublishers } from "../../services/fetchsApi";
import { setPublishers, setLoading, setError } from "./publishersSlice";

export const fetchPublishers = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const publishersData = await getPublishers(); 
      dispatch(setPublishers(publishersData));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const searchPublishersThunk = (query) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const searchResults = await searchPublishers(query); 
      dispatch(setPublishers(searchResults));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};