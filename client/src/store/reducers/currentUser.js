import actions from "../actions";
import { isEmpty } from "lodash";

export default function currentUser(currentUser = {}, action) {
   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         if (isEmpty(action.payload)) {
            window.localStorage.removeItem("authToken");
         }
         return action.payload;
      default:
         return currentUser;
   }
}
