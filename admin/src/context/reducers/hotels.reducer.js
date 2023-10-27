export const hotelsReducer = (state, { type, payload }) => {
   switch (type) {
      case "GET_Hotels": {
         return { ...state, hotels: payload?.hotels, count: payload?.count };
      }
      case "DELETE_HOTEL": {
         return { ...state, hotels: state.hotels.filter((hotel) => hotel._id !== payload) };
      }
      default: {
         throw new Error(`Unhandled action type: ${type}`);
      }
   }
};
