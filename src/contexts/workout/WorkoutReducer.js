import produce from "immer";
import { DEFAULT_SET } from "../../constants";
import { persist } from "../../helpers";

const ACTIONS = {
  START_WORKOUT: "START_WORKOUT",
  DISCARD_WORKOUT: "DISCARD_WORKOUT",
  UPDATE_WEIGHT: "UPDATE_WEIGHT",
  UPDATE_REPS: "UPDATE_REPS",
  ADD_EXERCISE: "ADD_EXERCISE",
  ADD_SET: "ADD_SET",
  REMOVE_SET: "REMOVE_SET",
  REMOVE_EXERCISE: "REMOVE_EXERCISE",
  TOGGLE_FINISHED: "TOGGLE_FINISHED",
};

const initialState = {
  exercises: {},
  workoutInProgress: false,
};

export const initializer = persist("get", "workout")
  ? persist("get", "workout")
  : initialState;

export const rootReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case ACTIONS.START_WORKOUT:
      draft.workoutInProgress = true;
      break;
    case ACTIONS.DISCARD_WORKOUT:
      draft.exercises = {};
      draft.workoutInProgress = false;
      break;
    case ACTIONS.UPDATE_WEIGHT:
      draft.exercises[payload.exerciseId].sets[payload.setId].weight =
        payload.newWeight;
      break;
    case ACTIONS.UPDATE_REPS:
      draft.exercises[payload.exerciseId].sets[payload.setId].reps =
        payload.newReps;
      break;
    case ACTIONS.ADD_EXERCISE:
      draft.exercises[payload.exerciseId] = payload.exercise;
      break;
    case ACTIONS.ADD_SET:
      draft.exercises[payload.exerciseId].sets[payload.setId] = DEFAULT_SET;
      break;
    case ACTIONS.REMOVE_SET:
      delete draft.exercises[payload.exerciseId].sets[payload.setId];
      break;
    case ACTIONS.REMOVE_EXERCISE:
      delete draft.exercises[payload.exerciseId];
      break;
    case ACTIONS.TOGGLE_FINISHED:
      draft.exercises[payload.exerciseId].sets[
        payload.setId
      ].isFinished = !draft.exercises[payload.exerciseId].sets[payload.setId]
        .isFinished;
      break;
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
});
