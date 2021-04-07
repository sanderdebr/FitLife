import { useEffect, useReducer } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import { formatDocument } from "../helpers";

const ACTIONS = {
  SET_EXERCISES: "SET_EXERCISES",
  START_LOADING: "START_LOADING",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.SET_EXERCISES:
      return {
        ...state,
        exercises: payload,
        loading: false,
      };
    default:
      return state;
  }
}

function useExercises() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    exercises: [],
  });

  const { user } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.START_LOADING });

    return database.exercises
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_EXERCISES,
          payload: snapshot.docs.map(formatDocument),
        });
      });
  }, [user]);

  return state;
}

export default useExercises;
