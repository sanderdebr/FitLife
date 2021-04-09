import { defaultSet } from "../../constants";

const initialState = {
  exercises: [],
};

export const initializer = localStorage.getItem("workout")
  ? JSON.parse(localStorage.getItem("workout"))
  : initialState;

export const rootReducer = (state, { type, payload, error }) => {
  switch (type) {
    case "ADD_EXERCISE": {
      return {
        ...state,
        exercises: [...state.exercises, payload],
      };
    }
    case "ADD_SET": {
      let newExercises = [...state.exercises];
      newExercises[payload].sets.push(defaultSet);

      return {
        ...state,
        exercises: newExercises,
      };
    }
    case "REMOVE_SET": {
      const { exerciseIndex, setIndex } = payload;

      let newExercises = [...state.exercises];
      newExercises[exerciseIndex].sets.splice(setIndex, 1);

      return {
        ...state,
        exercises: newExercises,
      };
    }
    case "TOGGLE_FINISHED": {
      const { exerciseIndex, setIndex } = payload;

      let newExercises = [...state.exercises];

      newExercises[exerciseIndex].sets[0].isFinished = !newExercises[
        exerciseIndex
      ].sets[0].isFinished;

      return {
        ...state,
        exercises: newExercises,
      };
    }
    default: {
      throw new Error(`Unhanlded action type: ${type}`);
    }
  }
};
