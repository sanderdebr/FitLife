import produce from "immer";
import { defaultSet } from "../../constants";
import { persist } from "../../helpers";

const initialState = {
  exercises: {},
  workoutInProgress: false,
};

export const initializer = persist("get", "workout")
  ? persist("get", "workout")
  : initialState;

export const rootReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case "START_WORKOUT":
      draft.workoutInProgress = true;
      break;
    case "DISCARD_WORKOUT":
      draft.exercises = {};
      draft.workoutInProgress = false;
      break;
    case "UPDATE_WEIGHT":
      draft.exercises[payload.exerciseId].sets[payload.setId].weight =
        payload.weight;
      break;
    case "UPDATE_REPS":
      draft.exercises[payload.exerciseId].sets[payload.setId].reps =
        payload.reps;
      break;
    case "ADD_EXERCISE":
      draft.exercises[payload.exerciseId] = payload.exercise;
      break;
    case "ADD_SET":
      draft.exercises[payload.exerciseId].sets[payload.setId] = defaultSet;
      break;
    case "REMOVE_SET":
      delete draft.exercises[payload.exerciseId].sets[payload.setId];
      break;
    case "REMOVE_EXERCISE":
      delete draft.exercises[payload.exerciseId];
      break;
    case "TOGGLE_FINISHED":
      draft.exercises[payload.exerciseId].sets[
        payload.setId
      ].isFinished = !draft.exercises[payload.exerciseId].sets[payload.setId]
        .isFinished;
      break;
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
});
