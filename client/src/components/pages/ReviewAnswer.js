import React from "react";
import thumbsUpIcon from "../../icons/thumbs-up.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      if (this.props.queue.cards.length === 0) {
         this.props.history.push("/review-empty");
      }
   }

   goToNextCard() {
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         this.props.history.push("/review-empty");
      } else {
         this.props.dispatch({
            type: actions.INCREMENT_QUEUE_INDEX,
         });
         this.props.history.push("/review-imagery");
      }
   }

   storeEditableCard() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: { card: memoryCard, previousRoute: "/review-answer" },
      });
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      console.log({ memoryCard });
      return (
         <AppTemplate>
            <div className="py-4">
               <div id="tukhtgrredwefw" className="card bg-primary text-light">
                  <div className="card-body">
                     <div>{memoryCard && memoryCard.imagery}</div>
                  </div>
               </div>
               <div id="wfwgtgewdqwd" className="card bg-secondary text-light">
                  <div className="card-body">
                     <div>{memoryCard && memoryCard.answer}</div>
                  </div>
               </div>
            </div>
            <div className=" mx-auto ">
               <Link
                  to="/edit"
                  className="btn btn-link"
                  onClick={() => {
                     this.storeEditableCard();
                  }}
               >
                  Edit card
               </Link>
               <div className="float-right">
                  <button
                     className="btn btn-outline-secondary mr-4"
                     onClick={() => {
                        this.goToNextCard();
                     }}
                  >
                     Needs work
                  </button>
                  <button
                     className="btn  btn-secondary"
                     onClick={() => {
                        this.goToNextCard();
                     }}
                  >
                     <img
                        src={thumbsUpIcon}
                        className="mt-n3"
                        style={{ width: "28px" }}
                        alt=""
                     />
                     Got it
                  </button>
               </div>
            </div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(ReviewAnswer);
