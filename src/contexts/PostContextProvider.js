import React, {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import uniqid from 'uniqid';
import useLocalStorage from '../hooks/useLocalStorage';
import { AlertContext } from '../contexts/AlertContextProvider';
const constants = {
  ADD_POST: 'ADD_POST',
  DELETE_POST: 'DELETE_POST',
};

const reducer = (state, action) => {
  switch (action.type) {
    case constants.ADD_POST:
      return [...state, action.payload];
    case constants.DELETE_POST:
      return [...action.payload];
    default:
      return state;
  }
};

export const PostContext = React.createContext();

const PostContextProvider = (props) => {
  const initialState = [];
  const { alert, setAlert } = useContext(AlertContext);
  const [localStorageVal, setLocalStorageVal] = useLocalStorage(
    'Posts',
    () => []
  );

  const [state, dispatch] = useReducer(reducer, initialState, () => {
    // const storageData = localStorage.getItem('Posts');
    // return storageData ? JSON.parse(storageData) : [];
    return localStorageVal;
  });

  useEffect(() => {
    // localStorage.setItem('Posts', JSON.stringify(state));
    setLocalStorageVal(state);
  }, [setLocalStorageVal, state]);

  const createPostHandler = useCallback(
    (username, profileImgUrl, postTitle, postDetails, labels) => {
      dispatch({
        type: constants.ADD_POST,
        payload: {
          _id: uniqid(),
          username,
          profileImgUrl,
          postTitle,
          postDetails,
          labels: labels,
        },
      });

      return;
    },
    [dispatch]
  );

  const deletePostHandler = useCallback(
    (id) => {
      const updatedPosts = state.filter((post) => post._id !== id);

      dispatch({
        type: constants.DELETE_POST,
        payload: updatedPosts,
      });

      setAlert({
        ...alert,
        showAlert: true,
        message: 'Post deleted successfully',
      });
    },
    [state, dispatch]
  );

  const contextValue = useMemo(() => {
    return {
      state,
      stateUpdateFunctions: {
        createPostHandler,
        deletePostHandler,
      },
    };
  }, [state, createPostHandler, deletePostHandler]);

  return (
    <PostContext.Provider value={contextValue}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
