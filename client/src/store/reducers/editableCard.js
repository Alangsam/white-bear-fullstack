import actions from "../actions";

export default function editablCard(editablCard = {}, action) {
   let newEditablCard = { ...editablCard };
   switch (action.type) {
      case actions.STORE_EDITABLE_CARD:
         newEditablCard.card = action.payload.card;
         newEditablCard.previousRoute = action.payload.previousRoute;
         return newEditablCard;

      default:
         return editablCard;
   }
}
