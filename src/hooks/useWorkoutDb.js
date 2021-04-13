import { useEffect, useReducer } from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { database } from "../firebase";
import { formatDocument } from "../helpers";

const ACTIONS = {
  FETCHING_EXERCISES: "FETCHING_EXERCISES",
  FETCHING_WORKOUTS: "FETCHING_WORKOUTS",
  SET_EXERCISES: "SET_EXERCISES",
  SET_WORKOUTS: "SET_WORKOUTS",
};

const initialState = {
  isFetchingExercises: false,
  isFetchingWorkouts: false,
  exercises: [],
  workouts: [],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCHING_EXERCISES:
      return {
        ...state,
        isFetchingExercises: true,
      };
    case ACTIONS.FETCHING_WORKOUTS:
      return {
        ...state,
        isFetchingWorkouts: true,
      };
    case ACTIONS.SET_EXERCISES:
      return {
        ...state,
        exercises: payload,
        isFetchingExercises: false,
      };
    case ACTIONS.SET_WORKOUTS:
      return {
        ...state,
        workouts: payload,
        isFetchingWorkouts: false,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function useWorkoutDb() {
  const [workoutDbState, dispatch] = useReducer(reducer, initialState);

  const { user } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCHING_EXERCISES });

    return database.exercises
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_EXERCISES,
          payload: snapshot.docs.map(formatDocument),
        });
      });
  }, [user]);

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCHING_WORKOUTS });

    return database.workouts
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_WORKOUTS,
          payload: snapshot.docs.map(formatDocument),
        });
      });
  }, [user]);

  return workoutDbState;
}

export default useWorkoutDb;
