export function animal(state = "", action) {
  if (action.type === "SET_ANIMAL") {
    return action.payload;
  } else {
    return state;
  }
}
