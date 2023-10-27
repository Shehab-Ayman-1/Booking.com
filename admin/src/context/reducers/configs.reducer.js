export const setOpenSidenav = (dispatch, payload) => dispatch({ type: "OPEN_SIDENAV", payload });
export const setSidenavType = (dispatch, payload) => dispatch({ type: "SIDENAV_TYPE", payload });
export const setSidenavColor = (dispatch, payload) => dispatch({ type: "SIDENAV_COLOR", payload });
export const setTransparentNavbar = (dispatch, payload) => dispatch({ type: "TRANSPARENT_NAVBAR", payload });
export const setFixedNavbar = (dispatch, payload) => dispatch({ type: "FIXED_NAVBAR", payload });
export const setOpenConfigurator = (dispatch, payload) => dispatch({ type: "OPEN_CONFIGURATOR", payload });

export const configsReducer = (state, { type, payload }) => {
   switch (type) {
      case "OPEN_SIDENAV": {
         return { ...state, openSidenav: payload };
      }
      case "SIDENAV_TYPE": {
         return { ...state, sidenavType: payload };
      }
      case "SIDENAV_COLOR": {
         return { ...state, sidenavColor: payload };
      }
      case "TRANSPARENT_NAVBAR": {
         return { ...state, transparentNavbar: payload };
      }
      case "FIXED_NAVBAR": {
         return { ...state, fixedNavbar: payload };
      }
      case "OPEN_CONFIGURATOR": {
         return { ...state, openConfigurator: payload };
      }
      default: {
         throw new Error(`Unhandled action type: ${type}`);
      }
   }
};
