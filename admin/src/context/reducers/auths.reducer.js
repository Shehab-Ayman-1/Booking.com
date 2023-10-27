import { authStates } from "../state";

export const authsReducer = (state, { type, payload }) => {
   switch (type) {
      case "GET_AUTHS": {
         return { ...state, users: payload?.users, count: payload?.count };
      }
      case "GET_AUTH": {
         return { ...state, auth: payload };
      }
      case "DELETE_USER": {
         return { ...state, users: state.users.filter((user) => user._id !== payload) };
      }
      case "RESET": {
         return authStates;
      }
      default: {
         throw new Error(`Unhandled action type: ${type}`);
      }
   }
};
