import React from "react";
import editLogo from "../../icons/edit.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   // constructor() {
   //    super();
   // }
   storeEditableCard() {
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: { card: this.props.card, previousRoute: "/all-cards" },
      });
   }
   render() {
      return (
         <div className="py-4 d-flex align-items-start">
            <div className="flex-fill px-0">
               <div className="card bg-primary text-light">
                  <div className="card-body">
                     <div>{this.props.card.imagery}</div>
                  </div>
               </div>
               <div className="card bg-secondary text-light">
                  <div className="card-body">
                     <div>{this.props.card.answer}</div>
                  </div>
               </div>
            </div>

            <Link
               className="btn btn-link ml-4 d-flex mt-n2 d-inline"
               to="/edit"
               onClick={() => {
                  this.storeEditableCard();
               }}
            >
               <img
                  className=""
                  src={editLogo}
                  width="20px"
                  alt="edit-button"
               />
               Edit
            </Link>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {
      queue: state.queue,
      editableCard: state.editableCard,
   };
}

export default connect(mapStateToProps)(MemoryCard);
