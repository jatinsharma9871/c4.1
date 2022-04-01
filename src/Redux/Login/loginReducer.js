import { LOGIN } from "./action";
const initialState = { users: null };

export const loginReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { store: payload };
  }
};
